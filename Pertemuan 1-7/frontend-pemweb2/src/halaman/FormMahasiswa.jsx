import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { simpanMahasiswa } from '../api/layananMahasiswa'
import { ambilGalat } from '../api/konfigurasi'

const NILAI_AWAL = { nim: '', nama: '', angkatan: '', ipk: '' }

export default function FormMahasiswa() {
  const [isian, setIsian] = useState(NILAI_AWAL)
  const [galatKolom, setGalatKolom] = useState({})
  const [pesanGalat, setPesanGalat] = useState('')
  const [sedangMemuat, setSedangMemuat] = useState(false)
  const navigasi = useNavigate()

  function ubahIsian(peristiwa) {
    const { name, value } = peristiwa.target
    setIsian((sebelumnya) => ({ ...sebelumnya, [name]: value }))
  }

  async function tanganiKirim(peristiwa) {
    peristiwa.preventDefault()
    setPesanGalat('')
    setGalatKolom({})
    setSedangMemuat(true)

    try {
      await simpanMahasiswa({
         nim: isian.nim,
         nama: isian.nama,
         email: isian.email,
         program_studi_id: Number(isian.program_studi_id),
         angkatan: Number(isian.angkatan),
         ipk: Number(isian.ipk),
      })
      navigasi('/mahasiswa')
    } catch (galat) {
      const hasil = ambilGalat(galat)
      setPesanGalat(hasil.pesan)
      // Validasi gagal (422 pada Laravel, 400/422 pada Fiber): tampilkan per kolom
      setGalatKolom(hasil.kolom)
    } finally {
      setSedangMemuat(false)
    }
  }

  function pesanKolom(nama) {
    const pesan = galatKolom[nama]
    if (!pesan) return null
    const teks = Array.isArray(pesan) ? pesan.join(', ') : String(pesan)
    return <small style={{ color: 'crimson', display: 'block' }}>{teks}</small>
  }

  return (
    <div style={{ maxWidth: 420, margin: '60px auto' }}>
      <h1>Tambah Mahasiswa</h1>
      {pesanGalat && <p style={{ color: 'crimson' }}>{pesanGalat}</p>}
      <form onSubmit={tanganiKirim}>
        <div>
          <label htmlFor="nim">NIM</label>
          <input id="nim" name="nim" value={isian.nim} onChange={ubahIsian} />
          {pesanKolom('nim')}
        </div>
        <div>
          <label htmlFor="nama">Nama</label>
          <input id="nama" name="nama" value={isian.nama} onChange={ubahIsian} />
          {pesanKolom('nama')}
        </div>
        <div>
          <label htmlFor="angkatan">Angkatan</label>
          <input
            id="angkatan"
            name="angkatan"
            type="number"
            value={isian.angkatan}
            onChange={ubahIsian}
          />
          {pesanKolom('angkatan')}
        </div>
        <div>
          <label htmlFor="ipk">IPK</label>
          <input
            id="ipk"
            name="ipk"
            type="number"
            step="0.01"
            value={isian.ipk}
            onChange={ubahIsian}
          />
          {pesanKolom('ipk')}
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={isian.email} onChange={ubahIsian} />
            {pesanKolom('email')}
        </div>
        <div>
            <label htmlFor="program_studi_id">Program Studi</label>
            <input
                id="program_studi_id"
                name="program_studi_id"
                type="number"
                value={isian.program_studi_id}
                onChange={ubahIsian}
            />
            {pesanKolom('program_studi_id')}
        </div>
        <button type="submit" disabled={sedangMemuat}>
          {sedangMemuat ? 'Menyimpan' : 'Simpan'}
        </button>{' '}
        <Link to="/mahasiswa">Batal</Link>
      </form>
    </div>
  )
}