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
    updateBalance(state, data) {
      state.user.balance = data.balance
      state.user.rank_pts = data.rank_pts
    }
  },
  actions: {
    login: ({ commit }, user) => {
      user.balance = parseFloat(user.balance).toFixed(0)
      localStorage.setItem('user', JSON.stringify(user))
      commit('login', user)
    },
    logout: ({ commit }) => {
      localStorage.removeItem('user')
      commit('logout')
    },
    updateBalance: ({ commit }, data) => {
      const user = JSON.parse(localStorage.getItem('user'))
      const balance = data.balance.toFixed(0)
      const rankPts = data.rank_pts

      const newUser = { ...user, balance: balance, rank_pts: rankPts }
      localStorage.setItem('user', JSON.stringify(newUser))
      commit('updateBalance', { balance: balance, rank_pts: rankPts })
    }
  },
  getters: {
    loggedIn: (state) => state.loggedIn,
    user: (state) => state.user
  }
})
