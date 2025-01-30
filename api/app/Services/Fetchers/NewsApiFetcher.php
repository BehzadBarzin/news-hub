<?php

namespace App\Services\Fetchers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NewsApiFetcher implements Fetcher
{
    protected string $url = 'https://newsapi.org/v2/top-headlines';
    protected string $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.apiKeys.news-api');
    }

    public function fetch(): array
    {
        $articles = [];

        // Todo: Fetch articles
        Log::debug("NewsAPI Fetch");

        return $articles;
    }
}
