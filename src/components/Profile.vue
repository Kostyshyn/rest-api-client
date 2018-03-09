<template>
  <div class="profile">
    <div v-if="user">
      Profile
      <h2>{{ user.username }}</h2>
      <hr>
      <em>followers: {{ user.followers.length }}</em>
      <br>
      <em>following: {{ user.follows.length }}</em>
      <br><br>
      <button class="button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as CONFIG from '../config.js'
import service from '../services'

export default {
  name: 'Profile',
  data(){
    return {
      user: null
    }
  },
  methods: {
    getUser(){
      let uri = CONFIG.ROOT_URI + '/api/users/' + this.href;
      axios.get(uri).then(response => {
        // console.log(response.data.user);
        this.user = response.data.user;
      }).catch(e => {
        if (e.response.data.errors){
          this.errors = e.response.data.errors;
        } else {
          console.error(e);
        }
      });
    },
    logout(){

      service.logout(this)

    }
  },
  computed: {
    href(){
      return this.$store.getters.getUser.href;
    }
  },
  created(){
    this.getUser();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
