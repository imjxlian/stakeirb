import { createStore } from 'vuex';

export const store = new createStore({
    state: {
        loggedIn: localStorage.getItem('username') !== null,
        uuid_user: localStorage.getItem('uuid_user') || '',
        username: localStorage.getItem('username') || '',
        email: localStorage.getItem('email') || '',
        balance: localStorage.getItem('balance') || '',
        pfp_url: localStorage.getItem('pfp_url') || '',
        rank_pts: localStorage.getItem('rank_pts') || '',
    },
    mutations: {
        login(state, user) {
            state.loggedIn = true;
            state.username = user.username;
            state.uuid_user = user.uuid_user;
            state.email = user.email;
            state.balance = user.balance;
            state.pfp_url = user.pfp_url;
            state.rank_pts = user.rank_pts;
        },
        logout(state) {
            state.loggedIn = false;
            state.username = '';
            state.uuid_user = '';
            state.email = '';
            state.balance = '';
            state.pfp_url = '';
            state.rank_pts = '';
        },
    },
    actions: {
        login: ({ commit }, user) => {
            localStorage.setItem('username', user.username);
            localStorage.setItem('uuid_user', user.uuid_user);
            localStorage.setItem('email', user.email);
            localStorage.setItem('balance', user.balance);
            localStorage.setItem('pfp_url', user.pfp_url);
            localStorage.setItem('rank_pts', user.rank_pts);
            commit('login', user);
        },
        logout: ({ commit }) => {
            localStorage.removeItem('username');
            localStorage.removeItem('uuid_user');
            commit('logout');
        },
    },
    getters: {
        loggedIn: state => state.loggedIn,
        username: state => state.username,
        uuid_user: state => state.uuid_user,
        email: state => state.email,
        balance: state => state.balance,
        pfp_url: state => state.pfp_url,
        rank_pts: state => state.rank_pts,
    },
});