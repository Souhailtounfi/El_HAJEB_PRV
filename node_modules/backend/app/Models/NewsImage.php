<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsImage extends Model
{
    protected $fillable = ['news_id','data','mime'];

    protected $hidden = ['data','mime','news_id','updated_at'];

    protected $appends = ['image_base64'];

    public function news()
    {
        return $this->belongsTo(News::class);
    }

    public function getImageBase64Attribute()
    {
        if (!$this->data || !$this->mime) return null;
        return 'data:' . $this->mime . ';base64,' . base64_encode($this->data);
    }
}
