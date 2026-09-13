<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MataKuliahController extends Controller{
    public function index(Request $request){
        $daftarMataKuliah = [
            ['kode' => 'TK001', 'nama' => 'Pemerograman Web II', 'sks' => 2],
            ['kode' => 'TK002', 'nama' => 'Internet of Things', 'sks' => 3],
            ['kode' => 'TK003', 'nama' => 'Keamanan Jaringan Internet', 'sks' => 2],
            ['kode' => 'TK004', 'nama' => 'Etika Profesi', 'sks' => 2],
            ['kode' => 'TK005', 'nama' => 'Manajemen Proyek', 'sks' => 3],
        ];

        $kataKunci = $request->query('q');

        if ($kataKunci) {
            $daftarMataKuliah = array_filter($daftarMataKuliah, function ($mk) use ($kataKunci) {
                return str_contains(strtolower($mk['nama']), strtolower($kataKunci))
                    || str_contains(strtolower($mk['kode']), strtolower($kataKunci));
            });
        }

        return view('matakuliah.index', [
            'daftarMataKuliah' => $daftarMataKuliah,
            'kataKunci' => $kataKunci,
        ]);
    }

    public function show(string $kode){
        return view('matakuliah.show', ['kode' => $kode]);
    }
}