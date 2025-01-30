<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('source'); // Source name (NewsAPI, Guardian, NYT)
            $table->string('title');
            $table->text('description')->nullable();
            $table->text('content')->nullable();
            $table->string('author')->nullable();
            $table->string('url')->unique();
            $table->string('image_url')->nullable();
            $table->timestamp('published_at');
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
