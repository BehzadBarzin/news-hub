<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\NewsAggregatorService;

class FetchNewsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:fetch';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch latest news articles from APIs';

    /**
     * Constructor
     *
     * NewsAggregatorService dependency is provided via Dependency Injection.
     */
    public function __construct(private NewsAggregatorService $newsService)
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->newsService->fetchNews();
        $this->info("News fetched successfully.");
    }
}
