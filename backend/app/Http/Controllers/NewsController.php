<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'extra_images' => 'nullable|array',
            'extra_images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Store main image path (relative, e.g. news_images/filename.jpg)
        $imagePath = $request->hasFile('image')
            ? $request->file('image')->store('news_images', 'public')
            : null;

        $news = News::create([
            'title_fr' => $validated['title_fr'],
            'title_ar' => $validated['title_ar'],
            'content_fr' => $validated['content_fr'],
            'content_ar' => $validated['content_ar'],
            'image' => $imagePath,
        ]);

        // Store extra images in news_images table
        if ($request->hasFile('extra_images')) {
            foreach ($request->file('extra_images') as $image) {
                $path = $image->store('news_images', 'public');
                NewsImage::create([
                    'news_id' => $news->id,
                    'image' => $path, // Only the relative path, e.g. news_images/filename.jpg
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'extra_images' => 'nullable|array',
            'extra_images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Update main image if provided
        if ($request->hasFile('image')) {
            if ($news->image) {
                Storage::disk('public')->delete($news->image);
            }
            $validated['image'] = $request->file('image')->store('news_images', 'public');
        } else {
            $validated['image'] = $news->image;
        }

        $news->update([
            'title_fr' => $validated['title_fr'],
            'title_ar' => $validated['title_ar'],
            'content_fr' => $validated['content_fr'],
            'content_ar' => $validated['content_ar'],
            'image' => $validated['image'],
        ]);

        // Add new extra images if any
        if ($request->hasFile('extra_images')) {
            foreach ($request->file('extra_images') as $image) {
                $path = $image->store('news_images', 'public');
                NewsImage::create([
                    'news_id' => $news->id,
                    'image' => $path, // Only the relative path
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

        // Delete main image
        if ($news->image) {
            Storage::disk('public')->delete($news->image);
        }

        // Delete extra images
        foreach ($news->images as $image) {
            Storage::disk('public')->delete($image->image);
            $image->delete();
        }

        $news->delete();

        return response()->json(['message' => 'News deleted successfully']);
    }
}
