<?php
namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\PageBlock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class PageController extends Controller {

    public function index() {
        return Page::select('slug','title_fr','title_ar','updated_at')->orderBy('slug')->get();
    }

    public function show(string $slug) {
        $page = Page::whereSlug($slug)->with('blocks')->firstOrFail();
        return response()->json($page);
    }

    // Upsert principal (POST /pages/{slug})
    public function upsert(Request $request, string $slug) {
        $this->authorizeAdmin($request);

        $data = $request->validate([
            'title_fr' => 'nullable|string|max:255',
            'title_ar' => 'nullable|string|max:255',
            'blocks'   => 'array',
            'blocks.*.type' => ['required', Rule::in(['heading','text','image','gallery','map'])],
            'blocks.*.text_fr' => 'nullable|string',
            'blocks.*.text_ar' => 'nullable|string',
            'blocks.*.image_path' => 'nullable|string',
            'blocks.*.alt_fr' => 'nullable|string|max:255',
            'blocks.*.alt_ar' => 'nullable|string|max:255',
            'blocks.*.gallery' => 'nullable|array',
            'blocks.*.gallery.*' => 'string',
            'blocks.*.map_url' => 'nullable|string',
            'blocks.*.meta' => 'nullable|array'
        ]);

        try {
            $page = DB::transaction(function () use ($slug, $data) {
                $page = Page::updateOrCreate(['slug'=>$slug], [
                    'title_fr' => $data['title_fr'] ?? null,
                    'title_ar' => $data['title_ar'] ?? null
                ]);

                $page->blocks()->delete();

                $pos = 1;
                foreach (($data['blocks'] ?? []) as $b) {
                    // Sanitize map_url (extract src if iframe pasted)
                    if (($b['type'] ?? null) === 'map' && !empty($b['map_url'])) {
                        $b['map_url'] = $this->extractMapSrc($b['map_url']);
                    }
                    PageBlock::create([
                        'page_id'    => $page->id,
                        'position'   => $pos++,
                        'type'       => $b['type'],
                        'text_fr'    => $b['text_fr'] ?? null,
                        'text_ar'    => $b['text_ar'] ?? null,
                        'image_path' => $b['image_path'] ?? null,
                        'alt_fr'     => $b['alt_fr'] ?? null,
                        'alt_ar'     => $b['alt_ar'] ?? null,
                        'gallery'    => $b['gallery'] ?? null,
                        'map_url'    => $b['map_url'] ?? null,
                        'meta'       => $b['meta'] ?? null,
                    ]);
                }

                return $page->load('blocks');
            });

            return response()->json($page);
        } catch (\Throwable $e) {
            Log::error('Page upsert failed', ['slug'=>$slug,'err'=>$e->getMessage()]);
            return response()->json([
                'message'=>'save_failed',
                'error'=>$e->getMessage()
            ], 422);
        }
    }

    private function extractMapSrc(string $raw): string {
        // If raw contains an iframe tag, extract src=""
        if (stripos($raw, '<iframe') !== false) {
            if (preg_match('/src=["\']([^"\']+)["\']/i', $raw, $m)) {
                return $m[1];
            }
        }
        // Trim attributes accidentally appended
        $parts = preg_split('/\s+(width|height|style|allowfullscreen|loading|referrerpolicy)=/i', $raw);
        return trim($parts[0]);
    }

    // Upload d’un asset image (utilisé par l’éditeur)
    public function uploadAsset(Request $request) {
        $this->authorizeAdmin($request);
        $request->validate([
            'file'=>'required|file|image|max:4096'
        ]);
        $path = $request->file('file')->store('page-blocks','public');
        // For DB we keep relative path "page-blocks/xxx"
        return response()->json([
            'path'=>$path,
            'url'=>asset('storage/'.$path)
        ]);
    }

    private function authorizeAdmin(Request $r){
        $u = $r->user();
        abort_unless($u && $u->is_admin, 403, 'forbidden');
    }
}