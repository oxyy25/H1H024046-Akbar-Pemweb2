<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Mahasiswa;
use App\Models\Matakuliah;

class MahasiswaMatakuliahSeeder extends Seeder
{
    public function run(): void
    {
        $daftarNilai = ['A', 'AB', 'B', 'BC', 'C', 'D', 'E'];
        $matakuliahIds = Matakuliah::pluck('id');

        Mahasiswa::all()->each(function ($mahasiswa) use ($matakuliahIds, $daftarNilai) {
            $jumlahAmbil = rand(3, 6);
            $dipilih = $matakuliahIds->random(min($jumlahAmbil, $matakuliahIds->count()));

            $dataPivot = [];
            foreach ($dipilih as $id) {
                $dataPivot[$id] = ['nilai' => $daftarNilai[array_rand($daftarNilai)]];
            }

            $mahasiswa->matakuliah()->attach($dataPivot);
        });
    }
}
