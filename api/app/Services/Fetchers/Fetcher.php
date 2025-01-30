<?php

namespace App\Services\Fetchers;

use App\Models\Article;

abstract class Fetcher
{
    abstract public function fetch();

    abstract protected function fetchCategoryArticles(string $apiCategory): array;

    abstract protected function saveArticle($article, $localCategoryId);

    protected function articleExists($articleUrl)
    {
        return Article::where('url', $articleUrl)->count() > 0;
    }
}
