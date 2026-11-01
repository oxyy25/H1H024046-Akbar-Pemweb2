<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class MahasiswaResource extends JsonResource
{
    private const FIELD_DIIZINKAN = [
        'id', 'nim', 'nama', 'email', 'angkatan', 'ipk', 'aktif',
        'program_studi', 'dibuat_pada',
    ];

    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'nim' => $this->nim,
            'nama' => $this->nama,
            'email' => $this->email,
            'angkatan' => $this->angkatan,
            'ipk' => (float) $this->ipk,
            'aktif' => $this->aktif,
            'program_studi' => $this->whenLoaded('programStudi', function () {
                return [
                    'id' => $this->programStudi->id,
                    'kode' => $this->programStudi->kode,
                    'nama' => $this->programStudi->nama,
                ];
            }),
            'dibuat_pada' => $this->created_at->toIso8601String(),
        ];

        return $this->pilihKolom($data, $request);
    }

    private function pilihKolom(array $data, Request $request): array
    {
        $fields = $request->query('fields');

        if (! is_string($fields) || trim($fields) === '') {
            return $data;
        }

        $diminta = array_map('trim', explode(',', $fields));
        // Whitelist: abaikan nama kolom yang tidak dikenal.
        $valid = array_values(array_intersect($diminta, self::FIELD_DIIZINKAN));

        if ($valid === []) {
            return $data;
        }

        // 'id' selalu disertakan agar klien tetap dapat mengidentifikasi data.
        return Arr::only($data, array_unique(array_merge(['id'], $valid)));
    }
}
