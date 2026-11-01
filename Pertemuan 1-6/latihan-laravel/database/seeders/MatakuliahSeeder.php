<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Matakuliah;

class MatakuliahSeeder extends Seeder {
   
    public function run(): void{
        $daftar = [
            ['kode' => 'TK101', 'nama' => 'Keamanan Jaringan Internet', 'sks' => 2, 'semester' => 5],
            ['kode' => 'TK102', 'nama' => 'Internet of Things', 'sks' => 3, 'semester' => 5],
            ['kode' => 'TK201', 'nama' => 'Etika Profesi', 'sks' => 2, 'semester' => 5],
            ['kode' => 'TK202', 'nama' => 'Pemrograman Web II',        'sks' => 3, 'semester' => 5],
            ['kode' => 'TK301', 'nama' => 'Manajemen Proyek', 'sks' => 3, 'semester' => 5],
        ];

        foreach ($daftar as $item) {
            Matakuliah::create($item);
        }
    }
}
