<template>
    <b-col lg="8" md="8" sm="12" class="chat-column" 
    :class='{ active: chatActive}'> 
      <div class="chat" v-if="chat">
        <div class="chat-header box">
          {{ participant2.username }}
        </div>
        <div class="last-seen-indicator">
          <span v-if="!participant2.online">seen {{ moment(participant2.last_seen).fromNow() }}</span>
        </div>
        <div class="messages-wrapper" ref="messages-wrapper">
          <div class="messages" ref="messages">
            <div class="loader" v-if="loading" :class="{ active: loading }" >
              <img src="../../../assets/loader.gif" alt="loader">
            </div>
              <div v-for="message in chat.messages" class="" 
              :class="[ ( message.meta.user == participant2._id ? 'to' : 'from' ),  ( message.meta.read ? '': 'unread' ) ]"> 
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
            <span class="mobile-chat-img">
              <router-link
              :to="{ path: `/users/${ participant2.href }` }"
              class=""
              active-class="active">
                <img :src="root + '/' + participant2.profile_img" alt="" class="s-profile-img">
                <span v-if="participant2.online"class="user-online-indicator"></span>
              </router-link>
            </span>
            <textarea-autosize   
            :min-height="40" 
            :max-height="200" 
            name="" id="" 
            v-model="newMessageText" 
            placeholder="..."
            @keydown.native="send"></textarea-autosize>
            <div class="send-message-wrapper">
              <button class="button main-button send-message" @click="send">Send</button>
            </div>
          </div>
      </div>
    </b-col>
</template>

<script>

import * as CONFIG from '../../../config.js'
import moment from 'moment'
import { Event } from '../../../events';
import chatService from '../../../services/chat-service'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/angle-right'

export default {
  name: 'Chat',
  data(){
    return {
      root: CONFIG.ROOT_URI,
      chat: null,
      chatActive: false,
      href: null,
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
    getChat(){
      chatService.getChat(this);
    },
    send(e){
      chatService.send(this, e);
    },
    loadMessages(){
      chatService.loadMessages(this);
    },
    scroll(){
      if (this.chat){
        var self =  this;
        setTimeout(function(){
          $(self.$refs['messages-wrapper']).animate({
            scrollTop: self.$refs['messages-wrapper'].scrollHeight
          }, 0);
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
    checkDelivering(){
      var self = this;
      setTimeout(function(){
        self.newMessages.forEach(function(item){
          if (!item.meta.delivered){
            item.meta.error = true;
          }
        });
      }, 3000);
    }
  },
  computed: {
    participant2(){
      if (this.chat){
        var participant1Id = this.$store.getters.getUser.id || this.$store.getters.getUser._id;
        var participant2 = this.chat.participant2;
        if (participant1Id == participant2._id){
          return this.chat.participant1;
        } else {
          return this.chat.participant2;
        }
      }
    }
  },
  watch: {
    '$route'(to, from){
      this.href = to.params.href;
      this.getChat();
    }
  },
  created(){
    this.getChat();
    var self = this;
    Event.$on('message', function(message){
      if (message.chat == self.chat._id){
        self.newMessages.push(message);
        var s = $(self.$refs['messages']).height() - $(self.$refs['messages-wrapper']).scrollTop();
        if (s < 1000){
          setTimeout(function(){
            $(self.$refs['messages-wrapper']).animate({
              scrollTop: self.$refs['messages-wrapper'].scrollHeight
            }, 0);
          }, 0);
        }
        if (!self.participant2.online){
          self.participant2.online = true;
        }
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat {
  position: fixed;
  width: 100%;
  width: 760px;
}
.chat-column {
  opacity: 0;
  transition: .2s;
}
.chat-column.active {
  opacity: 1;
}
.chat-header {
  min-height: 50px;
  height: auto;
  width: 100%;
  background-color: #fff;
  padding: 15px;
  position: relative;
  display: none;
}
.last-seen-indicator {
  padding: 17px 15px;
  text-align: center;
  font-size: 14px;
  color: rgba(115, 115, 115, .6);
  font-weight: bold;
  position: absolute;
  /*top: 10px;*/
  /*opacity: .6;*/
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}
.messages-wrapper {
  height: calc(100vh - 157px);
  overflow-y: auto;
  border-right: 1px solid #dee2e6;
  /*background-color: #f4f5f7;*/
}
.messages {
  padding: 15px 0px;
  display: flex;
  flex-direction: column;
  height: auto;
}
.message {
  display: inline-block;
  height: auto;
  padding: 7px 14px;
  line-height: 18px;
  font-weight: bold;
  color: #737373;
  font-size: 14px;
  margin: 10px 0px 0px 0px;
  border-radius: 10px;
  transition: all .3s ease;
  cursor: pointer;
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
.from, .to {
  padding: 0px 15px;
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
  background-color: #dee2e6;
}
.to.unread {
  /*background-color: #e9ecef;*/
}
.from .message {
  background-color: #b3f7f3;
}

.chat-form {
  position: fixed;
  bottom: 0px;
  display: flex;
  padding: 15px;
  background-color: #fff;
  height: auto;
  width: 760px;
  box-shadow: 0px -4px 25px 0px rgba(46, 61, 73, 0.2);
}
.chat-form textarea {
  min-height: 40px;
  height: auto;
  width: 100%;
  outline: none;
  border: 1px solid #c2c2c2;
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
  align-self: center;
}
.mobile-chat-img {
  display: none;
  /*position: absolute;*/
  text-align: center;
  line-height: 44px;
}
.mobile-chat-img img {
  margin-right: 10px;
  position: relative;
  z-index: 3;
}
@media screen and (max-width: 1200px){
  .chat-form, .chat {
    width: 640px;
  }
}
@media screen and (max-width: 992px){
  .chat-form, .chat {
    width: 480px;
  }
}
@media screen and (max-width: 768px){
  .mobile-chat-img {
    display: inline-block;
  }
  .chat-form, .chat {
    width: 540px;
  }
  .messages-wrapper {
    height: calc(100vh - 190px);
    /*height: calc(100vh - 137px);*/
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
  .user-online-indicator {
    top: 18px;
  }
  .message {
    padding: 7px 12px 5px 12px;
    line-height: 20px;
    font-weight: bold;
    font-size: 16px;
  }
  .chat-form, .chat {
    width: 100%;
  }
}

</style>
