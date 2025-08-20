<?php

namespace App\Http\Controllers;

use App\Models\NewsImage;
// Storage no longer needed (images in DB)

class NewsImageController extends Controller
{
    // Delete single extra image
    public function destroy($id)
    {
        $image = NewsImage::findOrFail($id);

    $newsId = $image->news_id;
    $image->delete(); // Only DB record
        \Log::info('NewsImage deleted:', ['id' => $id, 'news_id' => $newsId]);

        return response()->json([
            'message' => 'Extra image deleted successfully',
            'news_id' => $newsId
        ]);
    }

    public function store(\Illuminate\Http\Request $request, \App\Models\News $news)
    {
        $request->validate([
            'images'   => 'required|array|min:1|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:8192'
        ]);

        $saved = [];
        foreach ($request->file('images', []) as $file) {
            $saved[] = $news->images()->create([
                'data' => file_get_contents($file->getRealPath()),
                'mime' => $file->getClientMimeType(),
            ]);
        }

        // Reload to include base64 accessor
        $fresh = $news->images()->latest()->take(count($saved))->get();
        return response()->json([
            'message' => 'Images uploaded',
            'images'  => $fresh
        ], 201);
    }
}