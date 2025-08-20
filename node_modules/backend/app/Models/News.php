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
        'image_blob',
        'image_mime'
    ];

    protected $hidden = [
        'image_blob',
        'image_mime',
        'updated_at'
    ];

    protected $appends = [
        'image_base64'
    ];

    public function getImageBase64Attribute()
    {
        if (!$this->image_blob || !$this->image_mime) return null;
        return 'data:' . $this->image_mime . ';base64,' . base64_encode($this->image_blob);
    }

    public function images()
    {
        return $this->hasMany(NewsImage::class);
    }
}