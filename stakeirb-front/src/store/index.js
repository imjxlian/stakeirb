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
    }
  },
  getters: {
    loggedIn: (state) => state.loggedIn,
    user: (state) => state.user,
  }
})
