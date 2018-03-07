// import Vue from 'vue'
import socketio from 'socket.io-client'
// import VueSocketIO from 'vue-socket.io'
import * as CONFIG from '../config.js'
import { Event } from '../events';

function getConnection(token){
	const SocketInstance = socketio(CONFIG.ROOT_URI, { forceNew: true });	
	var socket = SocketInstance;
	socket.on('connect', function(client){
		socket.emit('authenticate', {
			token: token
		}).on('authenticated', function(){

		// already authenticated

		});

		socket.on('message', function(val){
			console.log(val);
		});

		socket.on('notification', function(note){
			if (note.type == 'message'){
				Event.$emit('message', note.payload);	
			}
			// Event.$emit('notification', note);
			// console.log(note);
		});

		socket.on('unauthorized', function(error, callback) {
  			if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
    			// redirect user to login page perhaps or execute callback:
    			callback();
    			console.log('User\'s token has expired unauth');
  			}
		});
	})
	return socket;
};

export { getConnection };