<?php

namespace App\Services\Fetchers;

use App\Models\Article;
use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use Illuminate\Support\Facades\Log;

abstract class Fetcher
{
    /**
     * API specific function to fetch a list of articles of a specific API category.
     *
     * @param string $apiCategory - the name of the API category
     * @return array - fetch articles of a specific API category from the API
     */
    abstract protected function fetchCategoryArticles(string $apiCategory): array;

    /**
     * Save the article, and associated authors and source into the local database.
     *
     * @param $article - API article object
     * @param $localCategoryId - The id of the local category that this article belongs to
     */
    abstract protected function saveArticle($article, $localCategoryId): void;

    /**
     * Returns an associative array of local categories mapped to an array of API specific categories.
     *
     * @return array associative array mapping local categories to API categories
     */
    abstract protected function getCategoryMappings(): array;

    /**
     * Returns the API specific `url` field of the article returned by API.
     * Used in `articleExists()`
     *
     * @param $apiArticle - API article object
     * @return string - url field of the article
     */
    abstract protected function getArticleURLField($apiArticle): string;

    // -----------------------------------------------------------------------------------------------------------------

    /**
     * Go through
     *
     * @return void
     */
    public function fetch(): void
    {
        $className = get_called_class();
        Log::info("{$className}: Start Fetching articles");

        // For each category mapping
        foreach ($this->getCategoryMappings() as $localCategoryName => $apiCategories)
        {
            // Get the local category from DB
            $localCategory = Category::where('name', $localCategoryName)->firstOrFail();

            // For each API category
            foreach ($apiCategories as $apiCategory)
            {
                $apiArticles = $this->fetchCategoryArticles($apiCategory);

                foreach ($apiArticles as $apiArticle)
                {
                    // If article already exists, ignore the rest (they are already imported) and go to the next API category.
                    if ($this->articleExists($apiArticle)) break;

                    $this->saveArticle($apiArticle, $localCategory->id);
                }
            }
        }

        Log::info("{$className}: Finished Fetching articles");
    }

    protected function articleExists($apiArticle)
    {
        $url = $this->getArticleURLField($apiArticle);
        return Article::where('url', $url)->count() > 0;
    }

    protected function createOrReturnSource(string $sourceName): Source
    {
        return Source::firstOrCreate([
            'name' => $sourceName,
        ]);
    }

    protected function createOrReturnAuthors(array $authorNames): array
    {
        $authors = [];

        foreach ($authorNames as $authorName)
        {
            $authors[] = Author::firstOrCreate([
                'name' => $authorName,
            ]);
        }

        return $authors;
    }
}
