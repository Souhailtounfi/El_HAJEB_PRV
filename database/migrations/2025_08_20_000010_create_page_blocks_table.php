<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('page_blocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('position');
            $table->enum('type',['heading','text','image','gallery','map']);
            $table->longText('text_fr')->nullable();
            $table->longText('text_ar')->nullable();
            $table->string('image_path')->nullable();
            $table->string('alt_fr')->nullable();
            $table->string('alt_ar')->nullable();
            $table->json('gallery')->nullable();
            $table->text('map_url')->nullable(); // TEXT
            $table->json('meta')->nullable();
            $table->timestamps();
            $table->index(['page_id','position']);
        });
    }
    public function down(): void {
        Schema::dropIfExists('page_blocks');
    }
};