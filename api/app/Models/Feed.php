<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @OA\Schema(
 *     schema="Feed",
 *     type="object",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="My Personal Feed"),
 *     @OA\Property(property="user_id", type="integer", example=1),
 *     @OA\Property(property="keywords", type="array", @OA\Items(type="string"), example={"laravel", "api"}),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2023-10-01T12:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2023-10-01T12:00:00Z"),
 *     @OA\Property(property="authors", type="array", @OA\Items(ref="#/components/schemas/Author")),
 *     @OA\Property(property="sources", type="array", @OA\Items(ref="#/components/schemas/Source")),
 *     @OA\Property(property="categories", type="array", @OA\Items(ref="#/components/schemas/Category"))
 * )
 */
class Feed extends Model
{
    protected $fillable = ['name', 'user_id', 'keywords'];

    protected $casts = [
        'keywords' => 'array', // Cast keywords to an array
    ];

    // Relationship with User
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relationship with Authors
    public function authors(): BelongsToMany
    {
        return $this->belongsToMany(Author::class, 'feed_author');
    }

    // Relationship with Sources
    public function sources(): BelongsToMany
    {
        return $this->belongsToMany(Source::class, 'feed_source');
    }

    // Relationship with Categories
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'feed_category');
    }

    /**
     * Constructs an Elequent query builder based on the criteria of this feed model.
     *
     * @return Builder - Elequent query builder
     */
    public function getArticlesQuery(): Builder
    {
        return Article::query()
            ->when($this->authors->isNotEmpty(), function ($query) {
                $query->whereHas('authors', function ($q) {
                    $q->whereIn('id', $this->authors->pluck('id'));
                });
            })
            ->when($this->sources->isNotEmpty(), function ($query) {
                $query->whereIn('source_id', $this->sources->pluck('id'));
            })
            ->when($this->categories->isNotEmpty(), function ($query) {
                $query->whereHas('categories', function ($q) {
                    $q->whereIn('id', $this->categories->pluck('id'));
                });
            })
            ->when($this->keywords, function ($query) {
                $query->where(function ($subQuery) {
                    foreach ($this->keywords as $keyword) {
                        $subQuery->orWhere('title', 'like', "%{$keyword}%");
                    }
                });
            });
    }
}
