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
        $titles = explode(',', $title);
        return $this->where(function ($query) use ($titles) {
            foreach ($titles as $title) {
                $query->orWhere('title', 'LIKE', "%$title%");
            }
        });
    }

    public function source($sourceId): ArticleFilter
    {
        $sourceIds = explode(',', $sourceId);
        return $this->whereIn('source_id', $sourceIds);
    }

    public function category($categoryId): ArticleFilter
    {
        $categoryIds = explode(',', $categoryId);
        return $this->whereIn('category_id', $categoryIds);
    }

    public function authors($authorIds): ArticleFilter
    {
        $authorIds = explode(',', $authorIds);
        return $this->whereHas('authors', function ($query) use ($authorIds) {
            $query->whereIn('authors.id', $authorIds);
        });
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
