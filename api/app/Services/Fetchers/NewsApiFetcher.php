<?php

namespace App\Services\Fetchers;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NewsApiFetcher extends Fetcher
{
    protected string $url = 'https://newsapi.org/v2/top-headlines';

    protected string $apiKey;

    protected array $categoryMappings = [
        'Business' => [ 'business' ],
        'Science' => [ 'science' ],
        'Sports' => [ 'sports' ],
        'Technology' => [ 'technology' ],
        'Health' => [ 'health' ],
        'Entertainment' => [ 'entertainment' ],
        'General' => [ 'general' ],
    ];


    public function __construct()
    {
        $this->apiKey = config('services.apiKeys.news-api');
    }

    public function fetch()
    {
        Log::debug("NewsAPI Fetcher");

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
                    if ($this->articleExists($apiArticle['url'])) break;

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
            'apiKey' => $this->apiKey,
            'category' => $apiCategory,
            'page' => 1,
            'pageSize' => 100,
        ]);

        $items = $response->json()['articles'] ?? [];

        return $items;
    }

    protected function saveArticle($article, $localCategoryId)
    {
        Article::create([
            'url' => $article['url'],
            'title' => $article['title'],
            'description' => $article['description'],
            'image_url' => $article['urlToImage'] ?? asset('images/news_api.png'),
            'published_at' => $article['publishedAt'],
            'source' => $article['source']['name'] ?? 'NewsAPI',
            'author' => $article['author'] ?? $article['source']['name'] ?? 'NewsAPI',
            'category_id' => $localCategoryId,
        ]);
    }
}
