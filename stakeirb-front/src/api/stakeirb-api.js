import axios from 'axios'
import Swal from 'sweetalert2'
import VueJwtDecode from 'vue-jwt-decode'
import {store} from "@/store";

const API_URL = 'http://localhost:3000'
const USERS_URL = `${API_URL}/users`

export const updateMoneyAmount = async (user) => {
  await Swal.fire({
    title: 'Enter the money amount you want to add',
    input: 'text',
    inputPlaceholder: 'Enter here...',
    showCancelButton: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    background: '#203141',
    color: '#ffffff',
    inputValidator: (value) => {
      // Vérifie si la valeur est un nombre compris entre 0 et 1000
      if (!value || isNaN(value) || parseInt(value) < 0 || parseInt(value) > 1000) {
        return 'Please enter a number between 0 and 1000';
      }
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      // Update user money amount
      const response = await axios.put(`${USERS_URL}/balance`, {
        money_amount: result.value,
        uuid_user: user.uuid_user
      })

      if (response.status === 200) {
        // Update user money amount in store
        const newBalance = parseInt(user.balance) + parseInt(result.value)
        await store.dispatch('updateBalance', {balance: newBalance, rank_pts: user.rank_pts})

        await Swal.fire({
          icon: 'success',
          toast: true,
          position: 'bottom',
          title: 'Success',
          text: 'Money amount updated',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#203141',
          color: '#ffffff'
        })
      } else {
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
      }
    }
  })
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

export const placeDiceBet = async (bet) => {
  try {
    let res = await axios.post('http://localhost:3000/games/dice', {
      is_under: bet.is_under,
      target: bet.target,
      bet_amount: bet.bet_amount
    })

    return res.data
  } catch (e) {
    Swal.fire({
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
  }
}
