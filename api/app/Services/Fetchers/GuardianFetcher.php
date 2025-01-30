<?php

namespace App\Services\Fetchers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Category;
use App\Models\Article;

class GuardianFetcher extends Fetcher
{
    protected string $url = 'https://content.guardianapis.com/search';

    protected string $apiKey;

    protected array $categoryMappings = [
        'Business' => [ 'business', 'money'],
        'Science' => [ 'science' ],
        'Sports' => [ 'sport' ],
        'Technology' => [ 'technology' ],
        'Health' => [ 'healthcare-network' ],
        'Entertainment' => [ 'fashion', 'tv-and-radio', 'stage', 'music', 'media'],
        'General' => [ 'world', 'politics', 'news', 'weather', 'us-news', 'travel', 'info'],
    ];

    public function __construct()
    {
        $this->apiKey = config('services.apiKeys.guardian');
    }

    public function fetch()
    {
        Log::debug("Guardian Fetcher");

        // For each category mapping
        foreach ($this->categoryMappings as $localCategoryName => $apiCategories)
        {
            // Get the local category from DB
            $localCategory = Category::where('name', $localCategoryName)->firstOrFail();

            // For each API category
            foreach ($apiCategories as $apiCategory)
            {
                $apiArticles = $this->fetchCategoryArticles($apiCategory);

                foreach ($apiArticles as $apiArticle)
                {
                    if ($this->articleExists($apiArticle['webUrl'])) break;

                    $this->saveArticle($apiArticle, $localCategory->id);
                }
            }
        }

    }

    protected function fetchCategoryArticles(string $apiCategory): array
    {
        $response = Http::withOptions([
            'verify' => false, // To fix Certificate error
        ])->get($this->url, [
            'api-key' => $this->apiKey,
            'section' => $apiCategory,
            'page' => 1,
            'page-size' => 200,
        ]);

        $items = $response->json()['response']['results'] ?? [];

        return $items;
    }

    protected function saveArticle($article, $localCategoryId)
    {
        Article::create([
            'url' => $article['webUrl'],
            'title' => $article['webTitle'],
            'description' => null,
            'image_url' => asset('images/guardian.jpg'),
            'published_at' => $article['webPublicationDate'],
            'source' => 'The Guardian',
            'author' => 'The Guardian',
            'category_id' => $localCategoryId,
        ]);
    }

}
