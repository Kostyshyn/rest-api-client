import * as CONFIG from '../config.js'
import { getConnection } from '../socket/'
import axios from 'axios'

export default {
	user: {
		authenticated: false
	},
	login(context, credentials){
		let uri = CONFIG.ROOT_URI + '/login';
		axios.post(uri, credentials).then(response => {
	        // this.user = response.data.user;
	        context.errors = null;
	        context.$store.dispatch('setToken', response.data.token);
	        context.$store.dispatch('setUser', response.data.user);
	        var socket = getConnection(response.data.token);
	        context.$store.dispatch('setSocket', getConnection(response.data.token));

	        console.log('auth v', s.connected, s.id)
	    }).catch(e => {
	        context.errors = e.response.data.error;
	    });
	},
	register(context, credentials){

	},
	logout(context){

	},
	checkAuth(context){

	}
}