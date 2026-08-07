<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    public function run(): void
    {
        // PENTING: data anggota tim di sini HARUS sudah dikonfirmasi pembimbing/kantor.
        // Sesuai struktur di website resmi (mcflyon.co.id/about) ada 3 posisi:
        // Fahrur Rozi (CEO), Aang Kurniawan (Kepala Divisi Implementator), dan
        // Database Administrator (nama di web resmi: "Saeni" — BELUM dikonfirmasi
        // ke pembimbing/HR, jadi untuk sementara ditahan sebagai placeholder).
        //
        // Cara pakai begitu nama "Saeni" (atau nama pengganti) sudah dikonfirmasi:
        // 1. Ganti 'name' di entry Database Administrator di bawah, lalu 'is_active' => true
        // 2. Kalau ada foto: upload ke storage/app/public/team/, isi 'image' => 'team/nama-file.jpg'
        // 3. Jalankan: php artisan db:seed --class=TeamSeeder

        $teams = [
            [
                'name' => 'Fahrur Rozi',
                'position' => 'Chief Executive Officer (CEO)',
                'image' => null, // upload foto asli ke storage/app/public/team/ lalu isi path di sini
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Aang Kurniawan',
                'position' => 'Kepala Divisi Implementator',
                'image' => null, // upload foto asli ke storage/app/public/team/ lalu isi path di sini
                'order' => 2,
                'is_active' => true,
            ],
            // [PERLU KONFIRMASI] Website resmi menampilkan nama "Saeni" di posisi ini.
            // SENGAJA is_active => false dulu supaya tidak ikut tampil di frontend
            // sebelum namanya dikonfirmasi ke pembimbing/HR.
            [
                'name' => '[Nama — perlu dikonfirmasi]',
                'position' => 'Database Administrator',
                'image' => null,
                'order' => 3,
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
