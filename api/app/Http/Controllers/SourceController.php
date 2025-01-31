<?php

namespace App\Http\Controllers;

use App\Models\Source;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class SourceController extends Controller
{
    public function index(Request $request): LengthAwarePaginator
    {
        $perPage = $request->query('per_page', 15);

        // Apply query param filter
        $query = Source::filter($request->all());

        // Populate relations if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->query('with'));
            $query->with($relations);
        }

        return $query->paginate($perPage);
    }

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
