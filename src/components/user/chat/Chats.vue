<template>
  <div class="chats-wrapper">
      <b-row>
        <b-col lg="3" md="4" sm="12" class="chat-column">
          <div class="chats" v-if="visible">
            <ul v-if="chats">
              <li v-for="chat in chats" @click="hideChats">
                <router-link
                  :to="{ name: 'Chat', params: { href: participant2(chat).href } }"
                  class=""
                  exact
                >chat with {{ participant2(chat).username }}</router-link>
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
import axios from 'axios'
import * as CONFIG from '../../../config.js'
import Chat from './Chat.vue'

export default {
  name: 'Chats',
  data(){
    return {
      chats: null,
      visible: false
    }
  },
  components: {
    Chat
  },
  methods: {
    getChats(){
      var token = this.$store.getters.getToken;
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
          this.chats = response.data.chats;
          console.log(response.data.chats);
          // console.log(this.$store.getters.getUser.id, this.chat.participant1._id);
        }).catch(e => {
          if (e.response.data.error){
            this.errors = e.response.data.error;
          } else {
            console.error(e);
          }
        });
      } else {
        // var w = window.innerWidth;
        // var mobile = false;
        // if ( w < 769 ){
        //   mobile = true;
        // };
        // if (mobile){
        //   this.$router.push('/login');
        // } else {
        //   this.$modal.show('login');
        // }
      }
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
      console.log(from)
      if (to.path == '/chat'){
        var w = window.innerWidth;
        if ( w < 769 ){
          this.visible = true;
        };
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
.chats ul li a {
  display: inline-block;
  box-sizing: border-box;
  height: auto;
  width: 100%;
  margin: 0px;
  padding: 15px;
  transition: .2s;
  background-color: #fff;
  color: #9a9a9a;
  font-size: 18px;
  text-decoration: none;
  border-bottom: 1px solid #dee2e6;
}
.chats ul li a:hover {
  color: #737373;  
}
.chats ul li a.router-link-exact-active.router-link-active {
  background-color: #dee2e6;
  color: #737373;
}
@media screen and (max-width: 575px){
  .chats ul li a {
    font-size: 20px;
    font-weight: bold;
    padding: 15px;
  }
}

</style>
