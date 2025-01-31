<?php

namespace App\Models;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Article",
 *     type="object",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="source_id", type="integer"),
 *     @OA\Property(property="category_id", type="integer"),
 *     @OA\Property(property="title", type="string"),
 *     @OA\Property(property="description", type="string"),
 *     @OA\Property(property="url", type="string"),
 *     @OA\Property(property="image_url", type="string"),
 *     @OA\Property(property="published_at", type="string", format="date-time"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time"),
 *     @OA\Property(property="source", ref="#/components/schemas/Source"),
 *     @OA\Property(property="category", ref="#/components/schemas/Category"),
 *     @OA\Property(property="authors", type="array", @OA\Items(ref="#/components/schemas/Author"))
 * )
 */
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
