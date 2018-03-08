<template>
  <div class="chats-wrapper">
      <b-row>
        <b-col lg="3" md="4" sm="12" class="chat-column">
          <div class="chats" v-if="visible">
            <ul v-if="chats">
              <li v-for="chat in chats">
                <router-link
                  :to="{ path: `/chat/${ chat.participant1.href }` }"
                  class=""
                  exact
                >chat with {{ chat.participant1.username }}</router-link> 
              </li>
            </ul>
          </div>
        </b-col>
        <transition name="fade" mode="out-in">

          <router-view></router-view>
          
        </transition>
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
      visible: true
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
  },
  computed: {

  },
  created(){
    this.getChats();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chats {
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
  height: calc(100vh - 80px);
}

</style>
