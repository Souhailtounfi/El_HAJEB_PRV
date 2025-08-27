<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\NewsImageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
// Categories
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);

// Public (no CSRF, no stateful sanctum)
Route::post('/login', [AuthController::class, 'login'])
    ->withoutMiddleware([
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    ]);

Route::post('/users', [UserController::class, 'store'])
    ->withoutMiddleware([
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    ]);

// Public read news
Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{id}', [NewsController::class, 'show']);



// Authenticated (personal access token) routes

// Authenticated (personal access token) routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // News management for any logged-in user
    Route::post('/news', [NewsController::class, 'store']);
    Route::put('/news/{id}', [NewsController::class, 'update']);
    Route::delete('/news/{id}', [NewsController::class, 'destroy']);
    Route::post('/news/{news}/images', [NewsImageController::class, 'store']); // upload multiple extra images
    Route::delete('/news-images/{id}', [NewsImageController::class, 'destroy']);
});



// Allow all authenticated users to see the users list
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
});

// Only strong admins can update/delete users
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::put('/users/{id}/password', [UserController::class, 'resetPassword']);
});
