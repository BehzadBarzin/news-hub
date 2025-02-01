<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Articles",
 *     description="Operations related to articles"
 * )
 */
class ArticleController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/articles",
     *     tags={"Articles"},
     *     summary="Get all articles",
     *     description="Returns a paginated list of articles with optional filtering and relations",
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Page number",
     *         required=false,
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Number of items per page",
     *         required=false,
     *         @OA\Schema(type="integer", default=15)
     *     ),
     *     @OA\Parameter(
     *         name="title",
     *         in="query",
     *         description="Comma-separated list of keywords to filter articles by title",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="source",
     *         in="query",
     *         description="Comma-separated array of Source IDs to filter articles by source",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="category",
     *         in="query",
     *         description="Comma-separated array of Category IDs to filter articles by category",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="authors",
     *         in="query",
     *         description="Comma-separated array of Author IDs to filter articles by authors",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="published_after",
     *         in="query",
     *         description="Filter articles published after a specific date (YYYY-MM-DD)",
     *         required=false,
     *         @OA\Schema(type="string", format="date")
     *     ),
     *     @OA\Parameter(
     *         name="published_before",
     *         in="query",
     *         description="Filter articles published before a specific date (YYYY-MM-DD)",
     *         required=false,
     *         @OA\Schema(type="string", format="date")
     *     ),
     *     @OA\Parameter(
     *         name="with",
     *         in="query",
     *         description="Comma-separated relations to include (e.g., source,category,authors). Supports nested relations (e.g. source.articles)",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/Article")),
     *             @OA\Property(property="meta", type="object", ref="#/components/schemas/PaginationMeta")
     *         )
     *     )
     * )
     */
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 15);

        // Apply query param filter
        $query = Article::filter($request->all());

        // Populate relations if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->query('with'));
            $query->with($relations);
        }

        return $query->simplePaginate($perPage);
    }

    /**
     * @OA\Get(
     *     path="/api/articles/{id}",
     *     tags={"Articles"},
     *     summary="Get a specific article",
     *     description="Returns a single article by ID with optional relations",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the article",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="with",
     *         in="query",
     *         description="Comma-separated relations to include (e.g., source,category,authors). Supports nested relations (e.g. source.articles)",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Article")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Article not found"
     *     )
     * )
     */
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
