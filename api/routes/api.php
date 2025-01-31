<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SourceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FeedController;

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'me']);

// API Routes
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{article}', [ArticleController::class, 'show']);

Route::get('/sources', [SourceController::class, 'index']);
Route::get('/sources/{source}', [SourceController::class, 'show']);

Route::get('/authors', [AuthorController::class, 'index']);
Route::get('/authors/{author}', [AuthorController::class, 'show']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/feeds', [FeedController::class, 'store']);
    Route::get('/feeds', [FeedController::class, 'index']);
    Route::get('/feeds/{feed}', [FeedController::class, 'show']);
    Route::get('/feeds/{feed}/articles', [FeedController::class, 'articles']);
    Route::patch('/feeds/{feed}', [FeedController::class, 'update']);
    Route::delete('/feeds/{feed}', [FeedController::class, 'destroy']);
});
