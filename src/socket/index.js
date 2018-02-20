// import Vue from 'vue'
import socketio from 'socket.io-client'
// import VueSocketIO from 'vue-socket.io'
import * as CONFIG from '../config.js'

// const SocketInstance = socketio(CONFIG.ROOT_URI);

function getConnection(token){
	const SocketInstance = socketio(CONFIG.ROOT_URI, { forceNew: true });	
	var socket = SocketInstance;
	socket.on('connect', function(client){
		socket.emit('authenticate', {
			token: token
		}).on('authenticated', function(){
			console.log('auth s', socket.connected, socket.id)

			// callback(socket);

		});

		socket.on('custom', function(val){
			console.log(val)
		})

		socket.on('unauthorized', function(error, callback) {
  			if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
    			// redirect user to login page perhaps or execute callback: 
    			callback();
    			console.log("User's token has expired unauth");
  			}
		});

		// socket.on('custom', function(val){
		// 	console.log(val)
		// })
	})
	return socket;
};

export { getConnection };