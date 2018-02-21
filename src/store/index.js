import Vuex from 'vuex'
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import { getConnection } from '../socket'

var vm = Vue;
vm.use(Vuex)

export default new Vuex.Store({
	// strict: true,
	state: {
		socket: null,
		token: null,
		user: null,
		isUserLoggedIn: false,
		socket: null
	},
	mutations: {
		initialState(state, payload){
			state.token = payload.token;
			state.socket = payload.socket;
			state.user = payload.user;
			state.isUserLoggedIn = true;
		},
		setSocket(state, socket){
			state.socket = socket;
		},
		setToken(state, token){
			state.token = token;
			state.isUserLoggedIn = true;
		},
		setSocket(state, socket){
			state.socket = socket;
		},
		setUser(state, user){
			state.user = user
		},
		logout(state){
			state.token = null;
			state.user = null;
			state.isUserLoggedIn = false;
			state.socket = null;
		}
	},
	actions: {
		initialState({ commit }, payload){
			commit('initialState', payload)
		},
		setSocket({ commit }, socket){
			commit('setSocket', socket)
		},
		setToken({ commit }, token){
			commit('setToken', token)
		},	
		setSocket({ commit }, socket){
			commit('setSocket', socket)
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
		},
		getSocket(state, getters){
			return state.socket;
		}
	}
})
