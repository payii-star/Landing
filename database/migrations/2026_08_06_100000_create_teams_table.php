<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position')->nullable();
            $table->string('image')->nullable();
            // NOTE: kolom bernama 'order' (bukan 'urutan' seperti tabel lain) supaya
            // cocok persis dengan kontrak TeamMember di resources/js/stores/landing.ts
            // dan resources/js/mocks/landingMock.ts (field: order, bukan urutan).
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
