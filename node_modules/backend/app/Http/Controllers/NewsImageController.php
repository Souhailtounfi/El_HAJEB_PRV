<?php

namespace App\Http\Controllers;

use App\Models\NewsImage;
use Illuminate\Support\Facades\Storage;

class NewsImageController extends Controller
{
    // Delete single extra image
    public function destroy($id)
    {
        $image = NewsImage::findOrFail($id);

        // Delete image file
        if ($image->image) {
            Storage::disk('public')->delete($image->image);
        }

        $newsId = $image->news_id;
        $image->delete();
        \Log::info('NewsImage deleted:', ['id' => $id, 'news_id' => $newsId]);

        return response()->json([
            'message' => 'Extra image deleted successfully',
            'news_id' => $newsId
        ]);
    }

    public function store(\Illuminate\Http\Request $request, \App\Models\News $news)
    {
        $request->validate([
            'images'   => 'required|array|min:1',
            'images.*' => 'image|max:4096'
        ]);

        $saved = [];
        foreach ($request->file('images', []) as $file) {
            $path = $file->store('news_images', 'public');
            $saved[] = $news->images()->create(['image' => $path]);
        }

        return response()->json([
            'message' => 'Images uploadées',
            'images'  => $saved
        ], 201);
    }
}