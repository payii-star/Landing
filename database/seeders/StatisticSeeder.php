<?php

namespace Database\Seeders;

use App\Models\Statistic;
use Illuminate\Database\Seeder;

class StatisticSeeder extends Seeder
{
    public function run(): void
    {
        $statistics = [
            ['icon' => 'briefcase', 'statistic' => '10+', 'label' => 'Proyek Selesai', 'urutan' => 1],
            ['icon' => 'users', 'statistic' => '8+', 'label' => 'Klien Terpercaya', 'urutan' => 2],
            ['icon' => 'calendar', 'statistic' => '8+', 'label' => 'Tahun Pengalaman', 'urutan' => 3],
        ];

        foreach ($statistics as $s) {
            Statistic::updateOrCreate(
                ['label' => $s['label']],
                array_merge(['is_active' => true], $s)
            );
        }
    }
}