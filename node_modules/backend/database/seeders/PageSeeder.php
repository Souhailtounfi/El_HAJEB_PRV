<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Page;
use App\Models\PageBlock;

class PageSeeder extends Seeder {
    public function run(): void {
        $page = Page::create([
            'slug'=>'apercu-historique',
            'title_fr'=>'Aperçu Historique',
            'title_ar'=>'لمحة تاريخية',
        ]);
        PageBlock::create([
            'page_id'=>$page->id,
            'position'=>1,
            'type'=>'text',
            'text_fr'=>'<p>Contenu initial.</p>',
            'text_ar'=>'<p>محتوى مبدئي.</p>',
        ]);
    }
}