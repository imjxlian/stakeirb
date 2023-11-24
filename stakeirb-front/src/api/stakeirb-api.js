import axios from 'axios'
import Swal from 'sweetalert2'

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

export const useLogin = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, user)
    localStorage.setItem('accessToken', response.data.accessToken)
    return response.data
  } catch (e) {
    await Swal.fire({
      icon: 'error',
      toast: true,
      position: 'bottom',
      title: 'Oops...',
      text: e.response.data.message || 'An error occurred',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#203141',
      color: '#ffffff'
    })
  }
}

export const useRegister = async (user) => {
  try {
    const response = axios.post(`${API_URL}/register`, user)
    localStorage.setItem('accessToken', response.data.accessToken)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const getUserInfos = async () => {
  try {
    const response = await axios.get(`${USERS_URL}/users`)
    // Store user infos in store
    
    return response.data
  } catch (e) {
    console.error(e)
  }
}