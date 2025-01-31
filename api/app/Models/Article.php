<?php

namespace App\Models;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use Filterable;

    protected $fillable = [
        'source_id', 'title', 'description', 'content', 'author',
        'url', 'image_url', 'published_at', 'category_id'
    ];


    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function source()
    {
        return $this->belongsTo(Source::class);
    }

    public function authors()
    {
        return $this->belongsToMany(Author::class, 'article_author');
    }
}
