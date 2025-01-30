<?php

namespace App\Services\Fetchers;

use App\Models\Article;
use App\Models\Author;
use App\Models\Source;

abstract class Fetcher
{
    abstract public function fetch();

    abstract protected function fetchCategoryArticles(string $apiCategory): array;

    abstract protected function saveArticle($article, $localCategoryId);

    protected function articleExists($articleUrl)
    {
        return Article::where('url', $articleUrl)->count() > 0;
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
