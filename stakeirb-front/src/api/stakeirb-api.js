import axios from 'axios'
import Swal from 'sweetalert2'
import VueJwtDecode from 'vue-jwt-decode'
import { store } from '@/store'
import {displayErrorModal, displaySuccessModal} from "@/components/modals/modalsManager";

const API_URL = 'http://localhost:3000'
const USERS_URL = `${API_URL}/users`
const BETS_URL = `${API_URL}/bets`
const MESSAGE_URL = `${API_URL}/messages`

export const getAllBetsFromUser = async (uuid_user) => {
    try {
        const response = await axios.get(`${BETS_URL}/user/${uuid_user}`)
        return response.data
    } catch (e) {
      displayErrorModal('Impossible to get bets from user')
    }
}

export const sendMessageFromUser = async (message) => {
    try {
      await axios.post(`${MESSAGE_URL}`, message)
    } catch (e) {
      displayErrorModal('Impossible to send message')
    }
}

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
        return 'Please enter a number between 0 and 1000'
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
        await store.dispatch('updateBalance', { balance: newBalance, rank_pts: user.rank_pts })
        displaySuccessModal('Money amount updated')
      } else {
        displayErrorModal('Impossible to update money amount')
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
    displayErrorModal('Wrong email or password')
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
    displayErrorModal('Impossible to register')
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
    displayErrorModal('Impossible to place bet')
  }
}
