import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/layananAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [kataSandi, setKataSandi] = useState('')
  const [pesanGalat, setPesanGalat] = useState('')
  const [sedangMemuat, setSedangMemuat] = useState(false)
  const navigasi = useNavigate()

  async function tanganiKirim(peristiwa) {
    peristiwa.preventDefault()
    setPesanGalat('')
    setSedangMemuat(true)

    try {
      const hasil = await login(email, kataSandi)
      sessionStorage.setItem('token', hasil.data.token)
      navigasi('/mahasiswa')
    } catch (galat) {
      if (galat.response) {
        setPesanGalat(galat.response.data.pesan)
      } else {
        setPesanGalat('Tidak dapat menghubungi server')
      }
    } finally {
      setSedangMemuat(false)
    }
  }

  return (
    <div>
      <h1>Masuk</h1>

      {pesanGalat && <p>{pesanGalat}</p>}

      <form onSubmit={tanganiKirim}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(peristiwa) => setEmail(peristiwa.target.value)}
            required
          />
        </div>

        <div>
          <label>Kata Sandi</label>
          <input
            type="password"
            value={kataSandi}
            onChange={(peristiwa) => setKataSandi(peristiwa.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={sedangMemuat}>
          {sedangMemuat ? 'Memproses' : 'Masuk'}
        </button>
      </form>
    </div>
  )
}