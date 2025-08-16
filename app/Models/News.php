<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_fr',
        'title_ar',
        'content_fr',
        'content_ar',
        'image'
    ];

    public function images()
    {
        return $this->hasMany(NewsImage::class);
    }
}