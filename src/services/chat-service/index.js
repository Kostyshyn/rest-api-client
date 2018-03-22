import * as CONFIG from '../../config.js'
import axios from 'axios'
import { Event } from '../../events'

export default {
	sortChats(chats){
		var result = chats.sort(function(a, b){
			return new Date(b.messages[b.messages.length - 1].created) - new Date(a.messages[a.messages.length - 1].created);
		});
		return result;
	},
	getChats(context){
		var token = context.$store.getters.getToken;
		if (token){
			let uri = CONFIG.ROOT_URI + '/api/users/chat';
			axios({
				url: uri,
				method: 'get',
				headers: {
					'x-access-token': token,
					'Content-Type': 'application/json'
				}
			}).then(response => {
				context.chats = response.data.chats;
				// context.chats = this.sortChats(response.data.chats); // sort chats by last message
			}).catch(e => {
				if (e.response){
					context.errors = e.response.data.error;
				} else {
					console.error(e);
				}
			});
		}
	},
	getChat(context){
		var href = context.href ? context.href : context.$route.params.href;
		var token = context.$store.getters.getToken;
		if (token && href){
			let uri = CONFIG.ROOT_URI + '/api/users/chat/' + href;
			axios({
				url: uri,
				method: 'get',
				headers: {
					'x-access-token': token,
					'Content-Type': 'application/json'
				}
			}).then(response => {
				context.chat = response.data.chat;
				context.chatActive = true;
				if (response.data.new){
					Event.$emit('newChat', response.data.chat);
				}
				context.checkScrollTop();
				context.scroll();
			}).catch(e => {
				if (e.response){
					context.errors = e.response.data.error;
				} else {
					console.error(e);
				}
			});
		} 
	},
	send(context, e){
		if (!e.shiftKey && e.keyCode == 13 || e.type == 'click'){
			e.preventDefault();
			var token = context.$store.getters.getToken;
			var user = context.$store.getters.getUser;
			if (context.newMessageText != null && context.newMessageText.trim() != '' && token){
				var newMessage = {
					message: context.newMessageText,
					created: Date.now(),
					meta: {
						user: user.id,
						delivered: false,
						error: false
					}
				};
				context.newMessages.push(newMessage);
				context.newMessageText = null;
				context.scroll();
				var href = context.href ? context.href : context.$route.params.href;
				let uri = CONFIG.ROOT_URI + '/api/users/chat/' + href;
				axios.post(uri, {
					token: token,
					message: newMessage.message,
					created: newMessage.created,
					chat: context.chat._id
				}).then(response => {
					context.newMessages.forEach(function(item){
						if (new Date(item.created).toISOString() == response.data.message.created){
							item.meta.delivered = true;
						}
					});
				}).catch(e => {
					context.checkDelivering();
					if (e.response){
						context.errors = e.response.data.error;
					} else {
						console.error(e);
					}
				});
			}
		}
	},
	loadMessages(context){
		var href = context.href ? context.href : context.$route.params.href;
		var token = context.$store.getters.getToken;
		if (token && href && context.page != null){
			context.loading = true;
			let uri = CONFIG.ROOT_URI + '/api/users/chat/' + href + '/messages';
			axios({
				url: uri,
				method: 'get',
				params: {
					chat: context.chat._id,
					page: context.page
				},
				headers: {
					'x-access-token': token,
					'Content-Type': 'application/json'
				}
			}).then(response => {
				console.log(response.data)
				// setTimeout(() => {
					context.loading = false;
				// }, 700);
				var messagesWrapper = context.$refs['messages-wrapper'];
				var messages = context.$refs['messages'];
				var h = $(messages).height();
				context.chat.messages.unshift.apply(context.chat.messages, response.data.messages);
				context.page = response.data.page;
				setTimeout(()=> {
					$(context.$refs['messages-wrapper']).animate({
						scrollTop: ($(messages).height() - h)
					}, 0);
				}, 0)
			}).catch(e => {
				if (e.response){
					context.errors = e.response.data.error;
				} else {
					console.error(e);
				}
			}); 
		}
	}
}