<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'source', 'title', 'description', 'content', 'author',
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
}
