import { createStore } from 'vuex'

export const store = createStore({
  state: {
    loggedIn: localStorage.getItem('accessToken') ? true : false,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
  },
  mutations: {
    login(state, user) {
      state.loggedIn = true
      state.user = user
    },
    logout(state) {
      state.loggedIn = false
      state.user = {}
    },
    updateBalance(state, balance) {
      state.user.balance = balance
    }
  },
  actions: {
    login: ({ commit }, user) => {
      localStorage.setItem('user', JSON.stringify(user))
      commit('login', user)
    },
    logout: ({ commit }) => {
      localStorage.removeItem('user')
      commit('logout')
    },
    updateBalance: ({ commit }, balance) => {
      const user = JSON.parse(localStorage.getItem('user'))
      const newUser = { ...user, balance: balance }
      localStorage.setItem('user', JSON.stringify(newUser))
      commit('updateBalance', balance)
    }
  },
  getters: {
    loggedIn: (state) => state.loggedIn,
    user: (state) => state.user
  }
})
