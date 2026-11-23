// Tugas 3: lapisan abstraksi backend. Ganti backend cukup lewat VITE_BACKEND di .env
// (laravel | fiber). Semua perbedaan kontrak dikumpulkan di satu tempat ini.
const DAFTAR_BACKEND = {
  laravel: {
    nama: 'laravel',
    baseURL: import.meta.env.VITE_API_LARAVEL,
    kolomSandi: 'password',
    bacaMeta: (meta) => ({
      halamanSaatIni: meta.current_page,
      totalHalaman: meta.last_page,
    }),
  },
  fiber: {
    nama: 'fiber',
    baseURL: import.meta.env.VITE_API_FIBER,
    kolomSandi: 'kata_sandi',
    bacaMeta: (meta) => ({
      halamanSaatIni: meta.halaman,
      totalHalaman: meta.total_halaman,
    }),
  },
}

const pilihan = import.meta.env.VITE_BACKEND || 'laravel'

export const backend = DAFTAR_BACKEND[pilihan] ?? DAFTAR_BACKEND.laravel

// Menyeragamkan galat dari server menjadi { pesan, kolom }.
// Mendukung bentuk Laravel (errors) maupun bentuk kustom (pesan, galat).
export function ambilGalat(galat) {
  if (!galat.response) {
    return { pesan: 'Tidak dapat menghubungi server', kolom: {} }
  }
  const data = galat.response.data || {}
  const kolom = data.errors || data.galat || {}
  const pesan = data.pesan || data.message || 'Terjadi kesalahan pada server'
  return { pesan, kolom }
}