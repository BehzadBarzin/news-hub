<?php

namespace App\Services\Fetchers;

use App\Models\Article;
use Illuminate\Support\Facades\Http;

class NewsApiFetcher extends Fetcher
{
    protected string $url = 'https://newsapi.org/v2/top-headlines';

    protected string $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.apiKeys.news-api');
    }

    protected function getCategoryMappings(): array
    {
        return [
            'Business' => [ 'business' ],
            'Science' => [ 'science' ],
            'Sports' => [ 'sports' ],
            'Technology' => [ 'technology' ],
            'Health' => [ 'health' ],
            'Entertainment' => [ 'entertainment' ],
            'General' => [ 'general' ],
        ];
    }

    protected function getArticleURLField($apiArticle): string
    {
        return $apiArticle['url'];
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

    protected function saveArticle($article, $localCategoryId): void
    {
        $source = $this->createOrReturnSource($article['source']['name'] ?? 'NewsAPI');

        $authors = $this->createOrReturnAuthors([$article['author'] ?? $article['source']['name'] ?? 'NewsAPI']);

        $dbArticle = Article::create([
            'url' => $article['url'],
            'title' => $article['title'],
            'description' => $article['description'],
            'image_url' => $article['urlToImage'] ?? asset('images/news_api.png'),
            'published_at' => $article['publishedAt'],
            'source_id' => $source->id,
            'category_id' => $localCategoryId,
        ]);

        $dbArticle->authors()->attach($authors);
    }
}
