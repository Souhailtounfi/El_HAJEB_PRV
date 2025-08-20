<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title_fr');
            $table->string('title_ar');
            $table->text('content_fr');
            $table->text('content_ar');
            // Use binary then alter to LONGBLOB (Laravel has no longBlob helper)
            $table->binary('image_blob')->nullable();
            $table->string('image_mime', 100)->nullable();
            $table->timestamps();
        });
        // Force column to LONGBLOB for large images (MySQL only)
        if (DB::getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE news MODIFY image_blob LONGBLOB NULL');
        }
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
