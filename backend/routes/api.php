<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\NewsImageController;
use App\Http\Controllers\UserController;
// use App\Http\Controllers\PageController; // temporarily disabled if controller removed

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

// Public pages (disabled until PageController exists)
// Route::get('/pages', [PageController::class,'index']);
// Route::get('/pages/{slug}', [PageController::class,'show']);

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

    // Page management routes disabled
    // Route::post('/pages/{slug}', [PageController::class,'upsert']);
    // Route::post('/pages-asset', [PageController::class,'uploadAsset']);
    // Route::middleware('auth:sanctum')->post('/pages', [PageController::class,'store']);
    // Route::middleware('auth:sanctum')->put('/pages/{slug}', [PageController::class,'update']);
    // Route::middleware('auth:sanctum')->post('/pages/{slug}/gallery', [PageController::class,'addGalleryImage']);
    // Route::middleware('auth:sanctum')->delete('/pages/{slug}/gallery/{index}', [PageController::class,'deleteGalleryImage']);
});
