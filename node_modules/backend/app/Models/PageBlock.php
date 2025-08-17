<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class PageBlock extends Model {
    protected $fillable = [
        'page_id','position','type',
        'text_fr','text_ar',
        'image_path','alt_fr','alt_ar',
        'gallery','map_url','meta'
    ];
    protected $casts = ['gallery'=>'array','meta'=>'array'];
    protected $appends = ['full_image_url','gallery_urls'];

    public function page(){ return $this->belongsTo(Page::class); }

    public function getFullImageUrlAttribute(){
        return $this->image_path ? asset('storage/'.$this->image_path) : null;
    }
    public function getGalleryUrlsAttribute(){
        if(!is_array($this->gallery)) return [];
        return array_map(fn($p)=>asset('storage/'.$p), $this->gallery);
    }
}