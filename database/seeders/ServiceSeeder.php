<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['title' => 'Informasi Teknologi', 'description' => 'Konsultasi dan solusi teknologi informasi sesuai kebutuhan bisnis Anda.', 'urutan' => 1],
            ['title' => 'Software Asli', 'description' => 'Pengembangan software original, bukan bajakan, dengan lisensi yang jelas.', 'urutan' => 2],
            ['title' => 'E-Commerce', 'description' => 'Pembuatan platform jual-beli online untuk mendukung penjualan digital Anda.', 'urutan' => 3],
            ['title' => 'Jasa Konsultasi', 'description' => 'Pendampingan dan analisis kebutuhan sistem sebelum pengembangan dimulai.', 'urutan' => 4],
            ['title' => 'Pengadaan Hardware', 'description' => 'Penyediaan perangkat keras (hardware) sesuai kebutuhan infrastruktur IT Anda.', 'urutan' => 5],
            ['title' => 'Web Developer', 'description' => 'Pembuatan website custom, company profile, hingga sistem berbasis web.', 'urutan' => 6],
        ];

        foreach ($services as $s) {
            Service::updateOrCreate(
                ['title' => $s['title']],
                array_merge(['icon' => null, 'is_active' => true], $s)
            );
        }
    }
}