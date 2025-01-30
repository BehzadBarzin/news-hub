<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\NewsAggregatorService;
use App\Services\Fetchers\NewsApiFetcher;
use App\Services\Fetchers\GuardianFetcher;
use App\Services\Fetchers\NYTFetcher;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(NewsAggregatorService::class, function ($app) {
            return new NewsAggregatorService([
                new NewsApiFetcher(),
                new GuardianFetcher(),
                new NytFetcher(),
            ]);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
