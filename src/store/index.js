import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: true,
	state: {
		token: null,
		user: null,
		isUserLoggedIn: false
	},
	mutations: {
		initializeCurrentState(state){
			if (localStorage.getItem('token')){
				state.token = JSON.parse(localStorage.getItem('token'));
				state.isUserLoggedIn = true;
			}
		},
		setToken(state, token){
			if (window.localStorage){
				localStorage.setItem('token', JSON.stringify(token));
			}
			state.token = token
			if (token){
				state.isUserLoggedIn = true
			} else {
				state.isUserLoggedIn = false
			}
		},
		setUser(state, user){
			state.user = user
		},
		logout(state){
			if (window.localStorage){
				localStorage.removeItem('token');
			}
			state.token = null
			state.user = null
			state.isUserLoggedIn = false
		}
	},
	actions: {
		setToken({ commit }, token){
			commit('setToken', token)
		},
		setUser({ commit }, user){
			commit('setUser', user)
		},
		logout({ commit }){
			commit('logout')
		}
	},
	getters: {
		getCurrentState(state, getters){
			return {
				token: state.token,
				user: state.user,
				isUserLoggedIn: state.isUserLoggedIn
			};
		}
	}
})
