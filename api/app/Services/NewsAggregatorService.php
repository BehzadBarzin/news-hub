<?php

namespace App\Services;

use App\Services\Fetchers\Fetcher;
use Illuminate\Support\Facades\Log;

class NewsAggregatorService
{

    private array $fetchers;

    public function __construct(array $fetchers)
    {
        $this->fetchers = $fetchers;
    }

    public function fetchNews()
    {
        foreach ($this->fetchers as $fetcher) {
            if ($fetcher instanceof Fetcher) {
                try {
                    $fetcher->fetch();
                } catch (\Exception $e) {
                    Log::error("Error while fetching news articles: {$e->getMessage()}");
                }
            }
        }
    }
}
