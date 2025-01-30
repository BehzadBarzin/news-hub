<?php

namespace App\Services\Fetchers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NYTFetcher implements Fetcher
{
    protected string $url = 'https://api.nytimes.com/svc/topstories/v2/';
    protected string $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.apiKeys.nyt');
    }

    public function fetch(): array
    {
        $articles = [];

        // Todo: Fetch articles
        Log::debug("NYT Fetch");

        return $articles;
    }
}
