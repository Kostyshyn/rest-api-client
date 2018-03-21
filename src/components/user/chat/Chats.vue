<template>
  <div class="chats-wrapper">
      <b-row>
        <b-col lg="3" md="4" sm="12" class="chat-column">
          <div class="chats" v-if="visible">
            <div class="chats-header">Messages</div>
            <ul v-if="chats">
              <li v-for="chat in chats" @click="hideChats"> 
                <router-link
                  :to="{ name: 'Chat', params: { href: participant2(chat).href } }"
                  class="chat-route box-l"
                  exact>
                  <router-link
                  :to="{ path: `/users/${ participant2(chat).href }` }"
                  class="u-chat-link">
                    <img :src="root + '/' + participant2(chat).profile_img" alt="" class="s-profile-img">
                    <span v-if="participant2(chat).online"class="user-online-indicator"></span>
                  </router-link>
                  {{ participant2(chat).username }} <span class="note-alert" v-if="chat.newMessagesCount > 0">{{ chat.newMessagesCount }}</span></router-link>
              </li>
            </ul>
          </div>
        </b-col>
        <!-- <transition name="fade" mode="out-in"> -->

          <router-view :key="$route.params.href"></router-view>
          
        <!-- </transition> -->
      </b-row>
  </div>
</template>

<script>
import Chat from './Chat.vue'
import { Event } from '../../../events';
import chatService from '../../../services/chat-service'
import * as CONFIG from '../../../config.js'

export default {
  name: 'Chats',
  data(){
    return {
      chats: null,
      visible: false,
      errors: null,
      root: CONFIG.ROOT_URI
    }
  },
  components: {
    Chat
  },
  methods: {
    getChats(){
      chatService.getChats(this);
    },
    hideChats(){
      var w = window.innerWidth;
      if ( w < 769 ){
        this.visible = false;
      };
    },
    participant2(chat){
      var participant1Id = this.$store.getters.getUser.id || this.$store.getters.getUser._id;
      var participant2 = chat.participant2;
      if (participant1Id == participant2._id){
        return chat.participant1;
      } else {
        return chat.participant2;
      }
    }
  },
  watch: {
    '$route'(to, from){
      var w = window.innerWidth;
      if ( w < 769 ){
        if (to.path == '/chat'){
          this.visible = true;
        } else if (from.path == '/chat'){
          this.visible = false;
        }
      }
    }
  },
  beforeRouteEnter(to, from, next){
    if (to.path == '/chat'){
      next(vm => {
        var w = window.innerWidth;
        if ( w < 769 ){
          vm.visible = true;
        };
      });
    } else {
      next();
    }
  },
  computed: {

  },
  beforeDestroy () {
    Event.$off('newChat');
  },
  mounted(){
    var self = this;
    Event.$on('newChat', function(chat){
      if (self.chats){
        self.chats.push(chat);
      }
    });
  },
  created(){
    var w = window.innerWidth;
    if ( w > 769 ){
      this.visible = true;
    };
    this.getChats();
    var self = this;
      Event.$on('message', function(message){
        if (self.visible){
          var chat = self.chats.filter(chat => chat._id == message.chat);
          self.chats = self.chats.filter(chat => chat._id != message.chat);
          self.chats.unshift(chat[0]);
          chat[0].newMessagesCount++;
        } 
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chats {
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
  min-height: calc(100vh - 80px);
  height: auto;
  background-color: #f4f5f7;
}
.chats-header {
  min-height: 30px;
  height: auto;
  font-weight: bold;
  font-size: 20px;
  text-align: left;
  padding: 15px 15px 0px 15px;
  color: #9a9a9a;
}
.chats ul {
  margin: 0px;
  padding: 10px 0px;
}
.chats ul li {
  display: inline-block;
  box-sizing: border-box;
  margin: 0px;
  width: 100%;
  padding: 5px 10px;
}
.chats ul li a.chat-route {
  outline: none;
  display: inline-block;
  box-sizing: border-box;
  height: auto;
  width: 100%;
  margin: 0px;
  padding: 10px 15px;
  transition: .15s;
  background-color: #fff;
  color: #9a9a9a;
  font-size: 18px;
  text-decoration: none;
  border-radius: 4px;
  margin-right: 10px;
  position: relative;
  border-right: 7px solid #fff;
}
.chats ul li a.chat-route .note-alert {
  position: absolute;
  right: 20px;
  top: 20px;
}
.chats ul li a.chat-route:hover {
  color: #737373; 
  text-decoration: none; 
}
.chats ul li a.chat-route .u-chat-link:hover {
  text-decoration: none;
}
.chats ul li a.chat-route .s-profile-img {
  margin-right: 10px;
  z-index: 3;
  position: relative;
}
.chats ul li a.chat-route.router-link-exact-active.router-link-active {
  border-right: 7px solid #41ede1;
  color: #737373;
}
@media screen and (max-width: 575px){
  .chats ul li a.chat-route {
    font-size: 20px;
    font-weight: bold;
    padding: 15px;
  }
  .user-online-indicator {
    top: 13px;
    left: 13px;
  }
  .chats ul li a.chat-route .note-alert {
    top: 24px;
  }
  .chats-header {
    font-size: 22px;
  }
}

</style>
