<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Page extends Model {
    protected $fillable = ['slug','title_fr','title_ar','meta'];
    protected $casts = ['meta'=>'array'];
    public function blocks() {
        return $this->hasMany(PageBlock::class)->orderBy('position');
    }
}