<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->enum('category', ['web', 'mobile'])
                ->default('web')
                ->after('link_project');
        });

        // Backfill data lama: sebelumnya kategori "mobile" ditebak dari title
        // yang diawali kata "Mobile" (lihat components/landing/Projects.vue).
        // Supaya data existing (17 project dari seeder) tidak berubah kategori
        // saat kolom ini ditambahkan, kita samakan hasilnya di sini.
        DB::table('projects')
            ->where('title', 'like', 'Mobile%')
            ->update(['category' => 'mobile']);
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('category');
        });
    }
};
