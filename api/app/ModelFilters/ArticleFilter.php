<?php

namespace App\ModelFilters;

use EloquentFilter\ModelFilter;

class ArticleFilter extends ModelFilter
{
    /**
    * Related Models that have ModelFilters as well as the method on the ModelFilter
    * As [relationMethod => [input_key1, input_key2]].
    *
    * @var array
    */
    public $relations = [];

    public function title($title): ArticleFilter
    {
        return $this->where('title', 'LIKE', "%$title%");
    }

    public function source($sourceId): ArticleFilter
    {
        return $this->where('source_id', $sourceId);
    }

    public function category($categoryId): ArticleFilter
    {
        return $this->where('category_id', $categoryId);
    }

    public function publishedAfter($date): ArticleFilter
    {
        return $this->where('published_at', '>=', $date);
    }

    public function publishedBefore($date): ArticleFilter
    {
        return $this->where('published_at', '<=', $date);
    }
}
