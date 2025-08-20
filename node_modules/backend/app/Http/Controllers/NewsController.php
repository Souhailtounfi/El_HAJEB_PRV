<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NewsController extends Controller
{
    // Get all news with images
    public function index()
    {
        return response()->json(News::with('images')->latest()->get());
    }

    // Create new news with images
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_fr' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'content_fr' => 'required|string',
            'content_ar' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:8192', // 8MB + webp
            'extra_images' => 'nullable|array|max:10',
            'extra_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:8192',
        ]);

        // Store main image binary inside DB
        $imageBlob = null;
        $imageMime = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageBlob = file_get_contents($file->getRealPath());
            $imageMime = $file->getClientMimeType();
        }

        $news = News::create([
            'title_fr' => $validated['title_fr'],
            'title_ar' => $validated['title_ar'],
            'content_fr' => $validated['content_fr'],
            'content_ar' => $validated['content_ar'],
            'image_blob' => $imageBlob,
            'image_mime' => $imageMime,
        ]);

        // Store extra images (binary)
        if ($request->hasFile('extra_images')) {
            foreach ($request->file('extra_images') as $image) {
                NewsImage::create([
                    'news_id' => $news->id,
                    'data' => file_get_contents($image->getRealPath()),
                    'mime' => $image->getClientMimeType(),
                ]);
            }
        }

        return response()->json([
            'message' => 'News created successfully',
            'data' => $news->load('images'),
        ], 201);
    }


    // Show single news with images
    public function show($id)
    {
        $news = \App\Models\News::with('images')->findOrFail($id);
        return response()->json($news);
    }

    // Update news with optional image updates
    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $validated = $request->validate([
            'title_fr' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'content_fr' => 'required|string',
            'content_ar' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:8192',
            'extra_images' => 'nullable|array|max:10',
            'extra_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:8192',
        ]);

        // Update main image (binary) if provided
        $payload = [
            'title_fr' => $validated['title_fr'],
            'title_ar' => $validated['title_ar'],
            'content_fr' => $validated['content_fr'],
            'content_ar' => $validated['content_ar'],
        ];
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $payload['image_blob'] = file_get_contents($file->getRealPath());
            $payload['image_mime'] = $file->getClientMimeType();
        }
        $news->update($payload);

        // Add new extra images if any
        if ($request->hasFile('extra_images')) {
            foreach ($request->file('extra_images') as $image) {
                NewsImage::create([
                    'news_id' => $news->id,
                    'data' => file_get_contents($image->getRealPath()),
                    'mime' => $image->getClientMimeType(),
                ]);
            }
        }

        return response()->json([
            'message' => 'News updated successfully',
            'data' => $news->fresh('images')
        ]);
    }

    // Delete news and all images
    public function destroy($id)
    {
        $news = News::with('images')->findOrFail($id);

        // Cascade deletes extra images via FK; nothing to delete on disk now
        foreach ($news->images as $image) {
            $image->delete();
        }

        $news->delete();

        return response()->json(['message' => 'News deleted successfully']);
    }
}
