<?php

namespace App\Http\Controllers;

use App\Models\Source;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Sources",
 *     description="Operations related to sources"
 * )
 */
class SourceController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/sources",
     *     tags={"Sources"},
     *     summary="Get all sources",
     *     description="Returns a paginated list of sources with optional filtering",
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
     *         name="name",
     *         in="query",
     *         description="Filter sources by name",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="with",
     *         in="query",
     *         description="Comma-separated relations to include (e.g., articles). Supports nested relations (e.g. articles.category)",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/Source")),
     *             @OA\Property(property="meta", type="object", ref="#/components/schemas/PaginationMeta")
     *         )
     *     )
     * )
     */
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 15);

        // Apply query param filter
        $query = Source::filter($request->all());

        // Populate relations if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->query('with'));
            $query->with($relations);
        }

        return $query->simplePaginate($perPage);
    }

    /**
     * @OA\Get(
     *     path="/api/sources/{id}",
     *     tags={"Sources"},
     *     summary="Get a specific source",
     *     description="Returns a single source by ID with optional relations",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the source",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="with",
     *         in="query",
     *         description="Comma-separated relations to include (e.g., articles). Supports nested relations (e.g. articles.category)",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Source")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Source not found"
     *     )
     * )
     */
    public function show(Request $request, Source $source): Source
    {
        // Populate relations if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->query('with'));
            $source->load($relations);
        }

        return $source;
    }
}
