import axios from 'axios'
import Swal from 'sweetalert2'
import { useStore } from 'vuex'
import VueJwtDecode from 'vue-jwt-decode';

const store = useStore()

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
    const response = await axios.post(`${USERS_URL}/login`, user)
    localStorage.setItem('accessToken', response.data.accessToken)
    // Decode JWT token to get user infos
    const decodedToken = VueJwtDecode.decode(response.data.accessToken)
    console.log(decodedToken);
    // Store user infos in store
    
    return true
  } catch (e) {
    console.error(e)
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
    return false
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

export const fetchUserInfos = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/profile`)
    // Store user infos in store
    store.dispatch('login', response.data)
    return response.data
  } catch (e) {
    console.error(e)
  }
}
