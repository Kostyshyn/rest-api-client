<template>
  <b-row>
    <b-col lg="6" md="10" sm="12" offset-md="1" offset-lg="3" class="chat-column"> 
      <div class="chat" v-if="chat">
        <div class="chat-header box">
          {{ participant2.username }}
          <div class="last-seen-indicator" v-if="!participant2.online">
            last seen {{ moment(participant2.last_seen).fromNow() }}
          </div>
        </div>
        <div class="messages-wrapper" ref="messages-wrapper">
          <div class="messages" ref="messages">
            <div class="loader" v-if="loading" :class="{ active: loading }" >
              <img src="../../../assets/loader.gif" alt="loader">
            </div>
              <div v-for="message in chat.messages" class="" :class="message.meta.user == participant2._id ? 'to' : 'from' ">
                <div class="message text-wrapping">
                  {{ message.message }}
                </div>
                <span class="message-date">{{ moment(message.created).calendar() }}</span>
              </div>

              <div v-for="message in newMessages" class="" :class="message.meta.user == participant2._id ? 'to' : 'from' ">
                <div class="message text-wrapping">
                  {{ message.message }}
                </div>
                <span class="message-date"><span class="send-error" v-if="!message.meta.delivered" :class="{ error: message.meta.error }"></span>{{ moment(message.created).calendar() }}</span>
              </div>

          </div>
        </div>
        <div class="chat-form">
            <textarea-autosize   
            :min-height="40" 
            :max-height="200" 
            name="" id="" 
            v-model="newMessageText" 
            placeholder="Write message ..."
            @keydown.native="send"></textarea-autosize>
            <div class="send-message-wrapper">
              <button class="send-message" @click="send"><icon name="angle-right"></icon></button>
            </div>
          </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>

import Icon from 'vue-awesome/components/Icon'
import axios from 'axios'
import * as CONFIG from '../../../config.js'
import moment from 'moment'

export default {
  name: 'Chat',
  data(){
    return {
      chat: null,
      users: null,
      newMessages: [],
      newMessageText: null,
      errors: null,
      moment: moment,
      loading: false,
      page: 0
    }
  },
  components: {
    Icon
  },
  methods: {
    send(e){
      // this.scroll();
      if (!e.shiftKey && e.keyCode == 13 || e.type == 'click'){
        e.preventDefault();
        var self = this;
        var token = this.$store.getters.getToken;
        var user = this.$store.getters.getUser;
        if (this.newMessageText != null && this.newMessageText.trim() != '' && token){

          var newMessage = {
            message: this.newMessageText,
            created: Date.now(),
            meta: {
              user: user.id,
              delivered: false,
              error: false
            }
          };
          this.newMessages.push(newMessage);
          this.newMessageText = null;
          this.scroll();

          var href = this.$route.params.href;

          let uri = CONFIG.ROOT_URI + '/api/users/' + href + '/chat';
          axios.post(uri, {
            token: token,
            message: newMessage.message,
            created: newMessage.created,
            chat: this.chat._id
          }).then(response => {
            this.newMessages.forEach(function(item){
              if (new Date(item.created).toISOString() == response.data.message.created){
                item.meta.delivered = true;
              }
            });
            // this.chat.messages.push(response.data.message);
            // this.scroll();
          }).catch(e => {
          
            this.checkDelivering();

            if (e.response.data.error){
              this.errors = e.response.data.error;
            } else {
              console.error(e);
            }
          });
        }
      }
    },
    scroll(){
      if (this.chat){
        var self =  this;
        setTimeout(function(){
          $(self.$refs['messages-wrapper']).animate({
            scrollTop: self.$refs['messages-wrapper'].scrollHeight
          }, 500);
        }, 0);
      }
    },
    checkScrollTop(){
      if (this.chat){
        var self =  this;
        setTimeout(function(){
          var messagesWrapper = self.$refs['messages-wrapper'];
          var messages = self.$refs['messages'];
          $(messagesWrapper).on('scroll', function(e){
            if ($(messagesWrapper).scrollTop() == 0){
              self.loadMessages();
            }
          });
        }, 0);
      }      
    },
    loadMessages(){
      var href = this.$route.params.href;
      var token = this.$store.getters.getToken;
      if (token && href && this.page != null){
        // this.loading = true;
        let uri = CONFIG.ROOT_URI + '/api/users/' + href + '/chat/messages';
        axios({
          url: uri,
          method: 'get',
          params: {
            chat: this.chat._id,
            page: this.page
          },
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
          }
        }).then(response => {
          console.log(response.data)
          // this.loading = false;

          var messagesWrapper = this.$refs['messages-wrapper'];
          var messages = this.$refs['messages'];

          var h = $(messages).height();

          this.chat.messages.unshift.apply(this.chat.messages, response.data.messages);
          this.page = response.data.page;

          setTimeout(()=> {
            $(this.$refs['messages-wrapper']).animate({
              scrollTop: ($(messages).height() - h)
            }, 0);
          }, 0)

        }).catch(e => {
          if (e.response.data.error){
            this.errors = e.response.data.error;
          } else {
            console.error(e);
          }
        }); 
      }   
    },
    getChat(){
      var href = this.$route.params.href;
      var token = this.$store.getters.getToken;
      if (token && href){
        let uri = CONFIG.ROOT_URI + '/api/users/' + href + '/chat';
        axios({
          url: uri,
          method: 'get',
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
          }
        }).then(response => {
          this.chat = response.data.chat;
          // console.log(response.data.chat);
          // console.log(this.$store.getters.getUser.id, this.chat.participant1._id);
          this.checkScrollTop();
          var self =  this;
          setTimeout(function(){
            $(self.$refs['messages-wrapper']).animate({
              scrollTop: self.$refs['messages-wrapper'].scrollHeight
            }, 0);
          }, 0);
        }).catch(e => {
          if (e.response.data.error){
            this.errors = e.response.data.error;
          } else {
            console.error(e);
          }
        });
      } else {
        var w = window.innerWidth;
        var mobile = false;
        if ( w < 769 ){
          mobile = true;
        };
        if (mobile){
          this.$router.push('/login');
        } else {
          this.$modal.show('login');
        }
      }
    },
    checkDelivering(){
      var self = this;
      setTimeout(function(){
        self.newMessages.forEach(function(item){
          if (!item.meta.delivered){
            item.meta.error = true;
            console.log('check', item)
          }
        });
      }, 3000);
    }
  },
  computed: {
    participant2(){
      if (this.chat){
        var participant1 = this.$store.getters.getUser;
        var participant2 = this.chat.participant2;
        if (participant1.id == participant2._id){
          return this.chat.participant1;
        } else {
          return this.chat.participant2;
        }
      }
    }
  },
  created(){
    this.getChat();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat {
  position: relative;
  width: 100%;
}
.chat-column {
  padding: 0px;
}
.chat-header {
  min-height: 50px;
  height: auto;
  width: 100%;
  background-color: #fff;
  padding: 15px;
  position: relative;
}
.last-seen-indicator {
  padding: 5px 0px 0px 0px;
  text-align: center;
  font-size: 14px;
  color: #737373;
  font-weight: bold;
  position: absolute;
  top: 60px;
  opacity: .6;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}
.messages-wrapper {
  height: calc(100vh - 207px);
  overflow-y: auto;
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
/*  display: flex;
  flex-direction: column;
  justify-content: flex-end;*/
}
.messages {
  padding: 15px;
  display: flex;
  flex-direction: column;
  height: auto;
}
.message {
  display: inline-block;
  height: auto;
  padding: 5px 12px 5px 12px;
  line-height: 18px;
  font-weight: bold;
  color: #737373;
  font-size: 14px;
  margin: 10px 0px 0px 0px;
  border-radius: 10px;
  transition: all .3s ease;
}
.from .message-date,
.to .message-date {
  display: block;
  font-size: 12px;
  margin-bottom: 5px;
  color: #d6d6d6;
  padding: 0px 5px;
}
.send-error {
  height: 8px;
  width: 8px;
  background-color: #ff8b94;
  border-radius: 50%;
  display: inline-block;
  opacity: 0;
  transition: .25s;
}
.send-error.error {
  opacity: 1;
}
.from .message-date .send-error {
  margin: 5px 5px 0px 0px;
}
.from .message-date {
  text-align: right;
}
.from {
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.to .message {
  background-color: #d6d6d6;
  border: 2px solid #d6d6d6;
}
.from .message {
  background-color: #fff;
  border: 2px solid #41e4de;
  text-align: right;
}

.chat-form {
  /*position: fixed;*/
  bottom: 0px;
  display: flex;
  padding: 15px;
  background-color: #fff;
  height: auto;
  width: 570px;
  box-shadow: 0px -4px 25px 0px rgba(46, 61, 73, 0.2);
}
.chat-form textarea {
  min-height: 40px;
  height: auto;
  width: 100%;
  outline: none;
  border: 2px solid #c2c2c2;
  padding: 5px 10px;
  color: #737373;
  font-size: 14px;
  line-height: 18px;
  margin-right: 10px;
  border-radius: 4px;
} 
.chat-form textarea::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
}

.chat-form textarea::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}
.chat-form textarea::-webkit-scrollbar-thumb {
  background-color: #d6d6d6;
}
.send-message-wrapper {
  align-self: flex-end;
}
.send-message {
  cursor: pointer;
  display: flex;
  height: 47px;
  width: 47px;
  border-radius: 4px;
  outline: none;
  border: none;
  background-color: #41e4de;
  color: #fff;
}
.send-message svg {
  height: 40px;
  width: 40px;
  margin: 0px 0px 3px 2px;
}

@media screen and (max-width: 1200px){
  .chat-form {
    width: 480px;
  }
}
@media screen and (max-width: 992px){
  .chat-form {
    width: 600px;
  }
}
@media screen and (max-width: 768px){
  .chat-form {
    width: 540px;
  }
  .messages-wrapper {
    height: calc(100vh - 187px);
  }
  .chat-form textarea {
    margin-right: 0px;
  }
  .send-message {
    display: none;
  }
}
@media screen and (max-width: 575px){
  .messages-wrapper {
    border-left: none;
    border-right: none;
  }
  .message {
    padding: 7px 12px 5px 12px;
    line-height: 20px;
    font-weight: bold;
    font-size: 16px;
  }
  .chat-form {
    width: 100%;
  }
}

</style>
