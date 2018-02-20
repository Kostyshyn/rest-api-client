import Vuex from 'vuex'
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import { getConnection } from '../socket'

var vm = Vue;
vm.use(Vuex)

export default new Vuex.Store({
	// strict: true,
	state: {
		token: null,
		user: null,
		isUserLoggedIn: false,
		socket: null
	},
	mutations: {
		initializeCurrentState(state){
			if (localStorage.getItem('token')){
				var token = JSON.parse(localStorage.getItem('token'));
				state.token = token;
				state.socket = getConnection(token);
				state.isUserLoggedIn = true;
			}
		},
		setToken(state, token){
			if (window.localStorage){
				localStorage.setItem('token', JSON.stringify(token));
			}
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
			if (window.localStorage){
				localStorage.removeItem('token');
			}
			state.token = null
			state.user = null
			state.isUserLoggedIn = false
			state.socket.disconnect();
			state.socket = null;
		}
	},
	actions: {
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
