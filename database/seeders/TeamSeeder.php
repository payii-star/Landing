<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    public function run(): void
    {
        // PENTING: data anggota tim di sini HARUS sudah dikonfirmasi pembimbing/kantor.
        // Jangan tambah nama karangan di sini — mock frontend (landingMock.ts) sudah
        // menandai hanya "Aang Kurniawan (Group CEO)" yang terkonfirmasi publik lewat LinkedIn.
        //
        // Cara pakai begitu daftar tim resmi masuk:
        // 1. Tambah entry baru ke array $teams di bawah dengan is_active => true
        // 2. Kalau ada foto: upload ke storage/app/public/team/, isi 'image' => 'team/nama-file.jpg'
        // 3. Jalankan: php artisan db:seed --class=TeamSeeder

        $teams = [
            [
                'name' => 'Aang Kurniawan',
                'position' => 'Group CEO',
                'image' => null, // upload foto asli ke storage/app/public/team/ lalu isi path di sini
                'order' => 1,
                'is_active' => true,
            ],
            // Placeholder contoh struktur — SENGAJA is_active => false supaya tidak
            // ikut tampil di frontend sebelum nama & jabatan asli dikonfirmasi.
            // Ganti 'name'/'position', isi foto, lalu ubah is_active => true.
            [
                'name' => '[Nama — perlu dikonfirmasi]',
                'position' => '[Jabatan — perlu dikonfirmasi]',
                'image' => null,
                'order' => 2,
                'is_active' => false,
            ],
        ];

        foreach ($teams as $t) {
            Team::updateOrCreate(
                ['name' => $t['name']],
                $t
            );
        }
    }
}
