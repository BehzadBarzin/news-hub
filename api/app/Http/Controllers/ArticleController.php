<?php

namespace App\Http\Controllers;

use App\Models\Article;
use \Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request): LengthAwarePaginator
    {
        $perPage = $request->query('per_page', 15);

        // Apply query param filter
        $query = Article::filter($request->all());

        // Populate relations if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->query('with'));
            $query->with($relations);
        }

        return $query->paginate($perPage);
    }

    public function show(Request $request, Article $article): Article
    {
        // Populate relations if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->query('with'));
            $article->load($relations);
        }

        return $article;
    }
}
