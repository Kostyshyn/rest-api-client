import * as CONFIG from '../config.js'
import { getConnection } from '../socket/'
import axios from 'axios'

export default {
	user: {
		authenticated: false
	},
	login(context, credentials, mobile){
		let uri = CONFIG.ROOT_URI + '/api/login';
		axios.post(uri, credentials).then(response => {
			var socket = getConnection(response.data.token);
			if (window.localStorage){
				localStorage.setItem('token', JSON.stringify(response.data.token));
				localStorage.setItem('user', JSON.stringify(response.data.user));
			}
	        context.loginErrors = null;
	        context.$store.dispatch('setToken', response.data.token);
	        context.$store.dispatch('setUser', response.data.user);
	        context.$store.dispatch('setSocket', socket);
	        if (mobile){
      			context.$router.push('/profile');
	      	} else {
	      		context.$modal.hide('login');
	      	}

	        context.userInput = null;
      		context.password = null;
	        // context.$router.push('/profile');
	    }).catch(e => {
	    	if (e.response.data.error){
	    		context.loginErrors = e.response.data.error;
	    	} else {
	    		console.error(e);
	    	}
	    });
	},
	register(context, credentials){
      	let uri = CONFIG.ROOT_URI + '/api/register';
      	axios.post(uri, credentials).then(response => {
			var socket = getConnection(response.data.token);
			if (window.localStorage){
				localStorage.setItem('token', JSON.stringify(response.data.token));
				localStorage.setItem('user', JSON.stringify(response.data.user));
			}
	        context.errors = null;
	        context.$store.dispatch('setToken', response.data.token);
	        context.$store.dispatch('setUser', response.data.user);
	        context.$store.dispatch('setSocket', socket);
	        context.$router.push('/profile');
      	}).catch(e => {
        	context.errors = e.response.data.error;
      	})
	},
	logout(context){
      	var socket = context.$store.getters.getSocket;
      	if (socket){
      		socket.disconnect();
			socket.removeAllListeners();
			if (window.localStorage){
				localStorage.removeItem('token');
				localStorage.removeItem('user');
			}
        	context.$store.dispatch('logout');
        	context.$router.push('/');
      	}
	},
    follow(context, mobile){
      let uri = CONFIG.ROOT_URI + '/api/users/' + context.href + '/follow';
      if (context.$store.getters.getCurrentState.isUserLoggedIn){
        var token = context.$store.getters.getToken;
        axios.post(uri, { token: token }).then(response => {
          context.errors = null;
          context.user = null;
          context.user = response.data.user;
          // response.data.user
        }).catch(e => {
            if (e.response.data.error){
              context.errors = e.response.data.error;
            } else {
              console.error(e);
            }
        });
      } else {
      	if (mobile){
      		context.$router.push('/login');
      	} else {
      		context.$modal.show('login');
      	}
      }
    },
	initialState(context){
		if (localStorage.getItem('token')){
			var token = JSON.parse(localStorage.getItem('token'));
			var user = JSON.parse(localStorage.getItem('user'));
			var socket = getConnection(token);
			context.$store.dispatch('initialState', { token: token, socket: socket, user: user });
		}
	},
	checkAuth(){
		
	}
}