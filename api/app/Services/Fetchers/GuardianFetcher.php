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

    public function __construct()
    {
        $this->apiKey = config('services.apiKeys.guardian');
    }

    protected function getCategoryMappings(): array
    {
        return [
            'Business' => [ 'business', 'money'],
            'Science' => [ 'science' ],
            'Sports' => [ 'sport' ],
            'Technology' => [ 'technology' ],
            'Health' => [ 'healthcare-network' ],
            'Entertainment' => [ 'fashion', 'tv-and-radio', 'stage', 'music', 'media'],
            'General' => [ 'world', 'politics', 'news', 'weather', 'us-news', 'travel', 'info'],
        ];
    }

    protected function getArticleURLField($apiArticle): string
    {
        return $apiArticle['webUrl'];
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

    protected function saveArticle($article, $localCategoryId): void
    {
        // Since below variables never change, define them as static and initialize them on first execution only.
        static $source = null;
        if (!$source) {
            $source = $this->createOrReturnSource('The Guardian');
        }

        static $authors = null;
        if (!$authors) {
            $authors = $this->createOrReturnAuthors(['The Guardian']);
        }

        $dbArticle = Article::create([
            'url' => $article['webUrl'],
            'title' => $article['webTitle'],
            'description' => null,
            'image_url' => asset('images/guardian.jpg'),
            'published_at' => $article['webPublicationDate'],
            'source_id' => $source->id,
            'category_id' => $localCategoryId,
        ]);

        $dbArticle->authors()->attach($authors);
    }
}
