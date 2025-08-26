<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
	public function index()
	{
		return response()->json(Category::all());
	}

	public function store(Request $request)
	{
			   $validated = $request->validate([
					   'name_fr' => 'required|string|max:255',
					   'name_ar' => 'required|string|max:255',
			   ]);
			   // Prevent duplicate (fr or ar)
			   if (Category::where('name_fr', $validated['name_fr'])->orWhere('name_ar', $validated['name_ar'])->exists()) {
				   return response()->json(['message' => 'Category already exists'], 409);
			   }
			   $category = Category::create($validated);
			   return response()->json(['message' => 'Category created', 'data' => $category], 201);
	}
}
