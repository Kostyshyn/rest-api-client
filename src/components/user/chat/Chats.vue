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
                  class="chat-route"
                  exact>
                  <router-link
                  :to="{ path: `/users/${ participant2(chat).href }` }"
                  class="">
                    <img :src="root + '/' + participant2(chat).profile_img" alt="" class="s-profile-img">
                  </router-link>
                  {{ participant2(chat).username }}</router-link>
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
      var participant1 = this.$store.getters.getUser;
      var participant2 = chat.participant2;
      if (participant1.id == participant2._id){
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
}
.chats-header {
  min-height: 40px;
  height: auto;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  padding: 10px 15px;
  color: #9a9a9a;
  border-bottom: 1px solid #dee2e6;
}
.chats ul {
  margin: 0px;
  padding: 0px;
}
.chats ul li {
  display: inline-block;
  box-sizing: border-box;
  margin: 0px;
  width: 100%;
}
.chats ul li a.chat-route {
  outline: none;
  display: inline-block;
  box-sizing: border-box;
  height: auto;
  width: 100%;
  margin: 0px;
  padding: 10px 15px;
  transition: .2s;
  background-color: #fff;
  color: #9a9a9a;
  font-size: 18px;
  text-decoration: none;
  border-bottom: 1px solid #dee2e6;
}
.chats ul li a.chat-route:hover {
  color: #737373;  
}
.chats ul li a.chat-route .s-profile-img {
  margin-right: 10px;
}
.chats ul li a.chat-route.router-link-exact-active.router-link-active {
  background-color: #dee2e6;
  color: #737373;
}
@media screen and (max-width: 575px){
  .chats ul li a.chat-route {
    font-size: 20px;
    font-weight: bold;
    padding: 15px;
  }
  .chats-header {
    font-size: 26px;
  }
}

</style>
