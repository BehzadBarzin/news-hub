<?php

namespace App\Http\Controllers;

use App\Models\Author;
use \Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index(Request $request): LengthAwarePaginator
    {
        $perPage = $request->query('per_page', 15);
        $query = Author::query();

        // Populate relations if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->query('with'));
            $query->with($relations);
        }

        return $query->paginate($perPage);
    }

    public function show(Request $request, Author $author): Author
    {
        // Populate relations if requested
        if ($request->has('with')) {
            $relations = explode(',', $request->query('with'));
            $author->load($relations);
        }

        return $author;
    }
}
