<?php

namespace App\Services\Fetchers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Category;
use App\Models\Article;

class NYTFetcher extends Fetcher
{
    protected string $url = 'https://api.nytimes.com/svc/topstories/v2/';

    protected string $apiKey;

    protected array $categoryMappings = [
        'Business' => [ 'business' ],
        'Science' => [ 'science' ],
        'Sports' => [ 'sports' ],
        'Technology' => [ 'technology' ],
        'Health' => [ 'health' ],
        'Entertainment' => [ 'movies', 'theater', 'fashion', 'arts'],
        'General' => [ 'world', 'politics', 'us'],
    ];

    public function __construct()
    {
        $this->apiKey = config('services.apiKeys.nyt');
    }

    public function fetch()
    {
        Log::debug("NYT Fetcher");

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
                    // If article already exists, ignore the rest
                    if ($this->articleExists($apiArticle['url'])) break;

                    $this->saveArticle($apiArticle, $localCategory->id);
                }
            }
        }

    }

    protected function fetchCategoryArticles(string $apiCategory): array
    {
        $endpoint = $this->url . "{$apiCategory}.json";

        // This API has a quota, we'll keep retrying with $delay seconds in-between up to $maxRetries times.
        $maxRetries = 5;
        $delay = 15; // Seconds
        $attempts = 0;

        while ($attempts < $maxRetries) {
            $response = Http::withOptions([
                'verify' => false, // To fix Certificate error
            ])->get($endpoint, [
                'api-key' => $this->apiKey,
            ]);

            if ($response->successful()) {
                return $response->json()['results'] ?? [];
            }

            if ($response->status() == 429) {
                sleep($delay);
                $attempts++;
                continue; // Retry request
            }

            // Other errors
            break;
        }

        return [];
    }

    protected function saveArticle($article, $localCategoryId)
    {
        // Since the below variable never changes, define it as static and initialize it on first execution only.
        static $source = null;
        if (!$source) {
            $source = $this->createOrReturnSource('New York Times');
        }

        $authors = $this->createOrReturnAuthors($this->getAuthors($article) ?? ['New York Times']);

        $dbArticle = Article::create([
            'url' => $article['url'],
            'title' => $article['title'],
            'description' => $article['abstract'],
            'image_url' => $this->getImage($article) ?? asset('images/nyt.webp'),
            'published_at' => $article['published_date'],
            'source_id' => $source->id,
            'category_id' => $localCategoryId,
        ]);

        $dbArticle->authors()->attach($authors);
    }

    // Todo: Needs Improvement
    private function getAuthors($apiArticle): array
    {
        $byLine = $apiArticle['byline'];

        $byLine = trim($byLine); // Trim any leading/trailing spaces
        $byLine = preg_replace('/^By\s+/i', '', $byLine); // Remove "By " only if it's at the start of the string
        $byLine = preg_replace('/\s+and\s+/i', ',', $byLine); // Replace " and " only when it's a separate word (not part of a name)
        $byLine = preg_replace('/\s*,\s*/', ',', $byLine); // Normalize spaces around commas
        $authors = array_map('trim', explode(',', $byLine)); // Split by comma and trim each name

        return array_filter($authors, fn($author) => !empty($author));
    }

    private function getImage($apiArticle)
    {
        $multimediaField = $apiArticle['multimedia'];
        if (isset($multimediaField) && is_array($multimediaField) && count($multimediaField) > 0)
        {
            $imageItems = array_filter($multimediaField, function($item) {
                return isset($item['type']) && $item['type'] === 'image';
            });

            return end($imageItems)['url'];
        }

        return null;
    }
}
