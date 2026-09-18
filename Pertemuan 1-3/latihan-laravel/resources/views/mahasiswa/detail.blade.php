@extends('layouts.app')

@section('judul', 'Detail Mahasiswa')

@section('konten')
<h1 class="h3 mb-3">{{ $mahasiswa->nama }}</h1>

<table class="table w-auto">
    <tr><th>NIM</th><td>{{ $mahasiswa->nim }}</td></tr>
    <tr><th>Program Studi</th><td>{{ $mahasiswa->programStudi->nama }}</td></tr>
    <tr><th>Angkatan</th><td>{{ $mahasiswa->angkatan }}</td></tr>
    <tr><th>IPK</th><td>{{ $mahasiswa->ipk }}</td></tr>
</table>

<h2 class="h5 mt-4">Matakuliah yang Diambil</h2>
<table class="table table-striped bg-white">
    <thead>
        <tr>
            <th>Kode</th>
            <th>Nama Matakuliah</th>
            <th>SKS</th>
            <th>Nilai</th>
        </tr>
    </thead>
    <tbody>
        @forelse ($mahasiswa->matakuliah as $mk)
            <tr>
                <td>{{ $mk->kode }}</td>
                <td>{{ $mk->nama }}</td>
                <td>{{ $mk->sks }}</td>
                <td>{{ $mk->pivot->nilai ?? '-' }}</td>
            </tr>
        @empty
            <tr><td colspan="4">Belum ada matakuliah yang diambil.</td></tr>
        @endforelse
    </tbody>
</table>
<a href="{{ route('mahasiswa.data') }}" class="btn btn-secondary btn-sm mb-3">&larr; Kembali ke Data Mahasiswa </a>
@endsection