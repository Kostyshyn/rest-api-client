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
		setToken(state, token){
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
	}
})
