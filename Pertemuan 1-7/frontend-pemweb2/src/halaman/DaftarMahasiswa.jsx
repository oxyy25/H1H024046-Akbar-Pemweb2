import { useEffect, useState } from 'react'
import { ambilDaftarMahasiswa } from '../api/layananMahasiswa'

export default function DaftarMahasiswa() {
  const [daftar, setDaftar] = useState([])
  const [meta, setMeta] = useState(null)
  const [halaman, setHalaman] = useState(1)
  const [cari, setCari] = useState('')
  const [sedangMemuat, setSedangMemuat] = useState(false)
  const [pesanGalat, setPesanGalat] = useState('')

  useEffect(() => {
    let dibatalkan = false

    async function muatData() {
      setSedangMemuat(true)
      setPesanGalat('')

      try {
        const hasil = await ambilDaftarMahasiswa({
          page: halaman,
          cari: cari,
          per_halaman: 10,
        })

        if (dibatalkan === false) {
          setDaftar(hasil.data)
          setMeta(hasil.meta)
        }
      } catch (galat) {
        if (dibatalkan === false) {
          setPesanGalat(
            galat.response ? galat.response.data.pesan : 'Tidak dapat menghubungi server'
          )
        }
      } finally {
        if (dibatalkan === false) {
          setSedangMemuat(false)
        }
      }
    }

    const penunda = setTimeout(muatData, 400)

    return () => {
      dibatalkan = true
      clearTimeout(penunda)
    }
  }, [halaman, cari])

  return (
    <div>
      <h1>Daftar Mahasiswa</h1>

      <input
        type="text"
        value={cari}
        onChange={(peristiwa) => {
          setHalaman(1)
          setCari(peristiwa.target.value)
        }}
      />

      {sedangMemuat && <p>Memuat data</p>}
      {pesanGalat && <p>{pesanGalat}</p>}
      {sedangMemuat === false && daftar.length === 0 && (
        <p>Data tidak ditemukan</p>
      )}

      <table>
        <thead>
          <tr>
            <th>NIM</th>
            <th>Nama</th>
            <th>Angkatan</th>
            <th>IPK</th>
          </tr>
        </thead>
        <tbody>
          {daftar.map((mahasiswa) => (
            <tr key={mahasiswa.nim}>
              <td>{mahasiswa.nim}</td>
              <td>{mahasiswa.nama}</td>
              <td>{mahasiswa.angkatan}</td>
              <td>{mahasiswa.ipk}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {meta && (
        <div>
          <button
            onClick={() => setHalaman(halaman - 1)}
            disabled={halaman <= 1}
          >
            Sebelumnya
          </button>

          <span>
            Halaman {meta.current_page} dari {meta.last_page}
          </span>

          <button
            onClick={() => setHalaman(halaman + 1)}
            disabled={meta.current_page >= meta.last_page}
          >
            Berikutnya
          </button>
        </div>
      )}
    </div>
  )
}