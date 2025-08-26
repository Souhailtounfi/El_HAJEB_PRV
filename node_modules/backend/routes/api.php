<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\NewsImageController;
use App\Http\Controllers\UserController;

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
Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware(['admin'])->group(function () {
        Route::post('/news', [NewsController::class, 'store']);
        Route::put('/news/{id}', [NewsController::class, 'update']);
        Route::delete('/news/{id}', [NewsController::class, 'destroy']);
    // Route model binding expects {news} not {id}
    Route::post('/news/{news}/images', [NewsImageController::class, 'store']); // upload multiple extra images
        Route::delete('/news-images/{id}', [NewsImageController::class, 'destroy']);
    });

});
