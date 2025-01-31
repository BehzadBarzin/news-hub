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
        Schema::create('feeds', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->json('keywords')->nullable(); // Store keywords as a JSON array
            $table->timestamps();
        });

        Schema::create('feed_author', function (Blueprint $table) {
            $table->foreignId('feed_id')->constrained()->onDelete('cascade');
            $table->foreignId('author_id')->constrained()->onDelete('cascade');
            $table->primary(['feed_id', 'author_id']);
        });

        Schema::create('feed_source', function (Blueprint $table) {
            $table->foreignId('feed_id')->constrained()->onDelete('cascade');
            $table->foreignId('source_id')->constrained()->onDelete('cascade');
            $table->primary(['feed_id', 'source_id']);
        });

        Schema::create('feed_category', function (Blueprint $table) {
            $table->foreignId('feed_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->primary(['feed_id', 'category_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feeds');
    }
};
