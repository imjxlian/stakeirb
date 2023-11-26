import axios from 'axios'
import Swal from 'sweetalert2'
import VueJwtDecode from 'vue-jwt-decode'

const API_URL = 'http://localhost:3000'
const USERS_URL = `${API_URL}/users`

export const getAllUsers = async () => {
  try {
    const response = await axios.get(USERS_URL)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const addUser = async (user) => {
  try {
    await axios.post(USERS_URL, user)
  } catch (e) {
    console.error(e)
  }
}

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${USERS_URL}/${id}`)
  } catch (e) {
    console.error(e)
  }
}

export const useLogin = async (user, store) => {
  try {
    const response = await axios.post(`${USERS_URL}/login`, user)
    localStorage.setItem('accessToken', response.data.accessToken)

    // Decode JWT token to get user infos
    const decodedToken = VueJwtDecode.decode(response.data.accessToken)

    const decodedUser = decodedToken.user

    // Store user infos in store
    store.dispatch('login', decodedUser)

    return true
  } catch (e) {
    await Swal.fire({
      icon: 'error',
      toast: true,
      position: 'bottom',
      title: 'Oops...',
      text: 'An error occurred',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#203141',
      color: '#ffffff'
    })
    return false
  }
}

export const useRegister = async (user, store) => {
  try {
    const response = await axios.post(`${USERS_URL}/register`, user)
    localStorage.setItem('accessToken', response.data.accessToken)

    // Decode JWT token to get user infos
    const decodedToken = VueJwtDecode.decode(response.data.accessToken)

    const decodedUser = decodedToken.user

    // Store user infos in store
    store.dispatch('login', decodedUser)

    return true
  } catch (e) {
    await Swal.fire({
      icon: 'error',
      toast: true,
      position: 'bottom',
      title: 'Oops...',
      text: 'An error occurred',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#203141',
      color: '#ffffff'
    })
    return false
  }
}
