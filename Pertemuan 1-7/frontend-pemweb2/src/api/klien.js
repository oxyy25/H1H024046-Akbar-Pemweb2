import axios from 'axios'
import { backend } from './konfigurasi'

const klien = axios.create({
  baseURL: backend.baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

klien.interceptors.request.use((konfigurasi) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    konfigurasi.headers.Authorization = `Bearer ${token}`
  }
  return konfigurasi
})

klien.interceptors.response.use(
  (respons) => respons,
  (galat) => {
    if (galat.response && galat.response.status === 401) {
      sessionStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(galat)
  }
)

export default klien