import axios from 'axios'

export const getCsrfCookie = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie', { withCredentials: true })
  } catch (error) {
    console.error('Error al obtener la cookie CSRF:', error)
  }
}
