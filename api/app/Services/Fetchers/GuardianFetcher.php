<?php

namespace App\Services\Fetchers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GuardianFetcher implements Fetcher
{
    protected string $url = 'https://content.guardianapis.com/search';
    protected string $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.apiKeys.guardian');
    }

    public function fetch(): array
    {
        $articles = [];

        // Todo: Fetch articles
        Log::debug("Guardian Fetch");

        return $articles;
    }
}
