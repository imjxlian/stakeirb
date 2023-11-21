import axios from 'axios'

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
