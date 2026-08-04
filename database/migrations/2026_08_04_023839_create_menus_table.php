<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('menus')->nullOnDelete();
            $table->string('label');
            $table->string('mobile_label')->nullable();
            $table->string('url');
            $table->enum('type', ['link', 'button-primary', 'button-outline'])->default('link');
            $table->enum('target', ['_self', '_blank'])->default('_self');
            $table->enum('visibility', ['all', 'guest', 'auth'])->default('all');
            $table->boolean('is_active')->default(true);
            $table->boolean('has_dropdown')->default(false);
            $table->boolean('show_on_mobile')->default(true);
            $table->boolean('show_on_desktop')->default(true);
            $table->integer('urutan')->default(0);
            $table->string('icon_class')->nullable();
            $table->string('custom_class')->nullable();
            $table->string('badge_text')->nullable();
            $table->string('badge_color')->nullable();
            $table->string('rel_attribute')->nullable();
            $table->unsignedInteger('click_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};