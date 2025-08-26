<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
	use HasFactory;

	protected $fillable = [
		'name_fr',
		'name_ar',
	];

	public function news()
	{
		return $this->hasMany(News::class);
	}
}
