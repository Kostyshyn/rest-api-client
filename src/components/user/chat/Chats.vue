<template>
  <div class="chats-wrapper">
      <b-row>
        <b-col lg="3" md="4" sm="12" class="chat-column">
          <div class="chats" v-if="visible">
            <div class="chats-header">
              <div class="heading-m t-center" :class="{ active: !searchVisible }">Chats</div>
              <input 
                type="text" 
                placeholder="Search ..." 
                v-model="searchChatsInput" 
                :class="{ active: searchVisible }" 
                class="search-chats-input no-select">
              <div class="search-btn" @click="toggleSearch"><icon name="search"></icon></div> 
            </div>
            <ul v-if="chats && !filteredChats">
              <li v-for="chat in chats" @click="hideChats"> 
                <router-link
                  :to="{ name: 'Chat', params: { href: participant2(chat).href } }"
                  class="chat-route box-l no-select"
                  exact>
                  <router-link
                  :to="{ path: `/users/${ participant2(chat).href }` }"
                  class="u-chat-link no-select">
                    <img :src="root + '/' + participant2(chat).profile_img" alt="" class="s-profile-img no-select">
                    <span v-if="participant2(chat).online"class="user-online-indicator"></span>
                  </router-link>
                  {{ participant2(chat).username }} <span class="note-alert" v-if="chat.newMessagesCount > 0">{{ chat.newMessagesCount }}</span></router-link>
              </li>
            </ul>
            <ul v-if="filteredChats && filteredChats.length > 0">
              <li v-for="chat in filteredChats" @click="hideChats"> 
                <router-link
                  :to="{ name: 'Chat', params: { href: participant2(chat).href } }"
                  class="chat-route box-l no-select"
                  exact>
                  <router-link
                  :to="{ path: `/users/${ participant2(chat).href }` }"
                  class="u-chat-link no-select">
                    <img :src="root + '/' + participant2(chat).profile_img" alt="" class="s-profile-img no-select">
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
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/search'

export default {
  name: 'Chats',
  data(){
    return {
      chats: null,
      filteredChats: null,
      visible: false,
      errors: null,
      root: CONFIG.ROOT_URI,
      searchVisible: false,
      searchChatsInput: null
    }
  },
  components: {
    Chat,
    Icon
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
    toggleSearch(){
      this.searchVisible = !this.searchVisible;
      this.searchChatsInput = null;
      if (this.filteredChats){
        this.filteredChats = null;
      }
    },
    participant2(chat){
      var participant1Id = this.$store.getters.getUser.id || this.$store.getters.getUser._id;
      var participant2 = chat.participant2;
      if (participant1Id === participant2._id){
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
        if (to.path === '/chat'){
          this.visible = true;
        } else if (from.path === '/chat'){
          this.visible = false;
        }
      }
    },
    'searchChatsInput'(value){
      if (value){
        const regex = new RegExp(value.trim(), 'i');
        this.filteredChats = this.chats.filter(chat => regex.test(this.participant2(chat).username) );
      }
    }
  },
  beforeRouteEnter(to, from, next){
    if (to.path === '/chat'){
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
          var chat = self.chats.filter(chat => chat._id === message.chat);
          if (chat.length > 0){
            self.chats = self.chats.filter(chat => chat._id != message.chat);
            self.chats.unshift(chat[0]);
            chat[0].newMessagesCount++;
          }
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
  min-height: 55px;
  height: auto;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: space-between
}
.chats-header .heading-m {
  color: #9a9a9a;
  width: 100%;
  transition: all .25s;
  opacity: 0;
}
.chats-header .search-btn {
  position: absolute;
  right: 15px;
}
.chats-header .heading-m.active {
  opacity: 1;
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
  .chats {
    border-left: none;
    border-right: none;
    min-height: calc(100vh - 107px);
  }
  .chats ul li a.chat-route {
    font-size: 20px;
  }
  .user-online-indicator {
    top: 8px;
    left: 13px;
  }
  .chats ul li a.chat-route .note-alert {
    top: 19px;
  }
  .chats-header {
    font-size: 22px;
  }
}

</style>
