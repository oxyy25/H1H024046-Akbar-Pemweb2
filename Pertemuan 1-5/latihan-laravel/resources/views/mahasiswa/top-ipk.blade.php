@extends('layouts.app')

@section('judul', '10 IPK Tertinggi - Teknik Komputer')

@section('konten')

<a href="{{ route('mahasiswa.data') }}" class="btn btn-secondary btn-sm mb-3">
    &larr; Kembali ke Data Mahasiswa
</a>

<h1 class="h3 mb-4">10 Mahasiswa dengan IPK Tertinggi</h1>
<p class="text-muted">Program Studi Teknik Komputer</p>

<table class="table table-striped bg-white">
    <thead>
        <tr>
            <th>Peringkat</th>
            <th>NIM</th>
            <th>Nama</th>
            <th>Angkatan</th>
            <th>IPK</th>
        </tr>
    </thead>
    <tbody>
        @forelse ($topMahasiswa as $index => $mahasiswa)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $mahasiswa->nim }}</td>
                <td>
                    <a href="{{ route('mahasiswa.detail', $mahasiswa) }}">
                        {{ $mahasiswa->nama }}
                    </a>
                </td>
                <td>{{ $mahasiswa->angkatan }}</td>
                <td>{{ $mahasiswa->ipk }}</td>
            </tr>
        @empty
            <tr>
                <td colspan="5">Belum ada data mahasiswa Teknik Komputer.</td>
            </tr>
        @endforelse
    </tbody>
</table>
@endsection