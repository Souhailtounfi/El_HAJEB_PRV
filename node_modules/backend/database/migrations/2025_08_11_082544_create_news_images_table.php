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
        Schema::create('news_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('news_id')->constrained()->onDelete('cascade');
            $table->binary('data');
            $table->string('mime', 100);
            $table->timestamps();
        });
        if (DB::getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE news_images MODIFY data LONGBLOB NOT NULL');
        }
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news_images');
    }
};
