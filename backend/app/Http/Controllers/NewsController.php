<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NewsController extends Controller
{
    // Get all news with images
    public function index(Request $request)
    {
        $query = News::with(['images', 'category'])->latest();
        if ($request->has('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }
        return response()->json($query->get());
    }

    // Create new news with images
    public function store(Request $request)
    {

        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'name_fr' => 'nullable|string|max:255',
            'name_ar' => 'nullable|string|max:255',
            'title_fr' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'content_fr' => 'required|string',
            'content_ar' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:8192',
            'extra_images' => 'nullable|array|max:10',
            'extra_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:8192',
        ]);

        // Assign categoryId after validation
        $categoryId = $validated['category_id'] ?? null;
        // If no category_id but both names are provided, create the category
        if (!$categoryId && !empty($validated['name_fr']) && !empty($validated['name_ar'])) {
            $cat = \App\Models\Category::firstOrCreate(
                [
                    'name_fr' => $validated['name_fr'],
                    'name_ar' => $validated['name_ar']
                ],
                [
                    'name_fr' => $validated['name_fr'],
                    'name_ar' => $validated['name_ar']
                ]
            );
            $categoryId = $cat->id;
        }

        $imageBlob = null;
        $imageMime = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageBlob = file_get_contents($file->getRealPath());
            $imageMime = $file->getClientMimeType();
        }

        $news = News::create([
            'category_id' => $categoryId,
            'title_fr' => $validated['title_fr'],
            'title_ar' => $validated['title_ar'],
            'content_fr' => $validated['content_fr'],
            'content_ar' => $validated['content_ar'],
            'image_blob' => $imageBlob,
            'image_mime' => $imageMime,
        ]);

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
            'data' => $news->load(['images', 'category']),
        ], 201);
    }


    // Show single news with images
    public function show($id)
    {
        $news = \App\Models\News::with(['images', 'category'])->findOrFail($id);
        return response()->json($news);
    }

    // Update news with optional image updates
    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'title_fr' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'content_fr' => 'required|string',
            'content_ar' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:8192',
            'extra_images' => 'nullable|array|max:10',
            'extra_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:8192',
        ]);

        $payload = [
            'category_id' => $validated['category_id'] ?? $news->category_id,
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
            'data' => $news->fresh(['images', 'category'])
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
