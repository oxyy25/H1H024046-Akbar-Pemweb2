@extends('layouts.app')

@section('judul', 'Daftar Mata Kuliah')

@section('konten')
    <h2>Daftar Mata Kuliah</h2>

    <form method="GET" action="{{ route('matakuliah.index') }}" class="row g-2 mb-3">
        <div class="col-md-3">
            <input
                type="text"
                name="q"
                value="{{ request('q') }}"
                placeholder="Cari kode atau nama matakuliah..."
                class="form-control"
            >
        </div>
        <div class="col-auto">
            <button type="submit" class="btn btn-primary">Cari</button>
        </div>
        @if(request('q'))
            <div class="col-auto">
                <a href="{{ route('matakuliah.index') }}" class="btn btn-outline-secondary">Reset</a>
            </div>
        @endif
    </form>

    <table class="table">
        <thead>
            <tr>
                <th>Kode</th>
                <th>Nama</th>
                <th>SKS</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($daftarMataKuliah as $mataKuliah)
                <tr>
                    <td>{{ $mataKuliah['kode'] }}</td>
                    <td>{{ $mataKuliah['nama'] }}</td>
                    <td><x-badge-sks :sks="$mataKuliah['sks']" /></td>
                    <td><a href="{{ route('matakuliah.show', ['kode' => $mataKuliah['kode']]) }}" class="btn btn-sm btn-primary">Detail</a></td>
                </tr>
            @empty
                <tr>
                    <td colspan="4" class="text-center">
                        @if(request('q'))
                            Matakuliah "{{ request('q') }}" tidak ditemukan
                        @else
                            Data belum tersedia
                        @endif
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>
@endsection