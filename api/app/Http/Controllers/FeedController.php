<?php

namespace App\Http\Controllers;

use App\Models\Feed;
use Illuminate\Http\Request;

class FeedController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/feeds",
     *     summary="Create a new feed",
     *     tags={"Feeds"},
     *     security={{"sanctum": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="My Personal Feed"),
     *             @OA\Property(property="authors", type="array", @OA\Items(type="integer"), example={1, 2}),
     *             @OA\Property(property="sources", type="array", @OA\Items(type="integer"), example={1}),
     *             @OA\Property(property="categories", type="array", @OA\Items(type="integer"), example={3}),
     *             @OA\Property(property="keywords", type="array", @OA\Items(type="string"), example={"laravel", "api"})
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Feed created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Feed")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'authors' => 'nullable|array',
            'sources' => 'nullable|array',
            'categories' => 'nullable|array',
            'keywords' => 'nullable|array',
        ]);

        $feed = Feed::create([
            'name' => $request->name,
            'user_id' => auth()->id(), // Authenticated user's id
            'keywords' => $request->keywords,
        ]);

        // Attach authors, sources, and categories
        if ($request->has('authors')) {
            $feed->authors()->attach($request->authors);
        }
        if ($request->has('sources')) {
            $feed->sources()->attach($request->sources);
        }
        if ($request->has('categories')) {
            $feed->categories()->attach($request->categories);
        }

        return response()->json($feed, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/feeds",
     *     summary="Get all feeds for the authenticated user",
     *     tags={"Feeds"},
     *     security={{"sanctum": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of feeds",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Feed")
     *         )
     *     )
     * )
     */
    public function index()
    {
        return Feed::where('user_id', auth()->id())->with(['sources', 'authors', 'categories'])->get();
    }

    /**
     * @OA\Get(
     *     path="/api/feeds/{id}",
     *     summary="Get a specific feed",
     *     tags={"Feeds"},
     *     security={{"sanctum": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Feed ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Feed details",
     *         @OA\JsonContent(ref="#/components/schemas/Feed")
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Feed not found"
     *     )
     * )
     */
    public function show(Feed $feed)
    {
        // Ensure the feed belongs to the authenticated user
        if ($feed->user_id !== auth()->id())
        {
            return response([
                'message' => 'Forbidden!'
            ], 403);
        }

        // Load the relationships
        $feed->load(['sources', 'authors', 'categories']);

        return $feed;
    }

    /**
     * @OA\Get(
     *     path="/api/feeds/{id}/articles",
     *     summary="Get articles for a specific feed",
     *     tags={"Feeds"},
     *     security={{"sanctum": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Feed ID",
     *         @OA\Schema(type="integer")
     *     ),
     *   @OA\Parameter(
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
     *         name="with",
     *         in="query",
     *         required=false,
     *         description="Comma-separated relations to include (e.g., source,category,authors). Supports nested relations (e.g. source.articles)",
     *         @OA\Schema(type="string", example="authors,categories")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Paginated list of articles",
     *         @OA\JsonContent(
     *             type="object",
     *             allOf={
     *                 @OA\Schema(ref="#/components/schemas/PaginationMeta"),
     *                 @OA\Schema(
     *                     @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/Article"))
     *                 )
     *             }
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Feed not found"
     *     )
     * )
     */
    public function articles(Request $request, Feed $feed)
    {
        // Ensure the feed belongs to the authenticated user
        if ($feed->user_id !== auth()->id())
        {
            return response([
                'message' => 'Forbidden!'
            ], 403);
        }

        $perPage = $request->query('per_page', 15);

        // Get the article query from Feed model
        $query = $feed->getArticlesQuery();

        // Populate relations if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->query('with'));
            $query->with($relations);
        }

        return $query->simplePaginate($perPage);
    }

    /**
     * @OA\Patch(
     *     path="/api/feeds/{id}",
     *     summary="Update a feed",
     *     tags={"Feeds"},
     *     security={{"sanctum": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Feed ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Updated Feed Name"),
     *             @OA\Property(property="authors", type="array", @OA\Items(type="integer"), example={1}),
     *             @OA\Property(property="sources", type="array", @OA\Items(type="integer"), example={1}),
     *             @OA\Property(property="categories", type="array", @OA\Items(type="integer"), example={3}),
     *             @OA\Property(property="keywords", type="array", @OA\Items(type="string"), example={"laravel", "api", "new"})
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Feed updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Feed")
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Feed not found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function update(Request $request, Feed $feed)
    {
        // Ensure the feed belongs to the authenticated user
        if ($feed->user_id !== auth()->id())
        {
            return response([
                'message' => 'Forbidden!'
            ], 403);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'authors' => 'nullable|array',
            'sources' => 'nullable|array',
            'categories' => 'nullable|array',
            'keywords' => 'nullable|array',
        ]);

        // Update feed attributes
        if ($request->has('name')) {
            $feed->name = $request->name;
        }
        if ($request->has('keywords')) {
            $feed->keywords = $request->keywords;
        }
        $feed->save();

        // Sync authors, sources, and categories (only if provided)
        if ($request->has('authors')) {
            $feed->authors()->sync($request->authors);
        }
        if ($request->has('sources')) {
            $feed->sources()->sync($request->sources);
        }
        if ($request->has('categories')) {
            $feed->categories()->sync($request->categories);
        }

        // Load the relationships
        $feed->load(['sources', 'authors', 'categories']);

        return response()->json($feed);
    }

    /**
     * @OA\Delete(
     *     path="/api/feeds/{id}",
     *     summary="Delete a feed",
     *     tags={"Feeds"},
     *     security={{"sanctum": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Feed ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Feed deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Feed not found"
     *     )
     * )
     */
    public function destroy(Feed $feed)
    {
        // Ensure the feed belongs to the authenticated user
        if ($feed->user_id !== auth()->id())
        {
            return response([
                'message' => 'Forbidden!'
            ], 403);
        }

        $feed->delete();

        return response()->json(null, 204);
    }
}
