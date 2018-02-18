import socketio from 'socket.io-client'
import * as CONFIG from '../config.js'

export default function(token){
	var socket = socketio.connect(CONFIG.ROOT_URI);
	socket.on('connect', function(client){
		// console.log(token);
		socket.emit('authenticate', {
			token: token
		}).on('authenticated', function(){
			console.log('auth')
		});

		socket.on("unauthorized", function(error, callback) {
  			if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
    			// redirect user to login page perhaps or execute callback: 
    			callback();
    			console.log("User's token has expired unauth");
  			}
		});
	})
};