<template>
  <div>
    <router-link
    to="/"
    class=""
    active-class="active"
    exact
    >Home</router-link>
    <div v-if="!isUserLoggedIn">
      <router-link
      to="login"
      class=""
      active-class="active"
      >Login</router-link>
      <router-link
      to="register"
      class=""
      active-class="active"
      >Register</router-link>
    </div>
    <div v-if="isUserLoggedIn">
      <a href="#" @click="logout">Logout</a> 
      <a href="#"></a>      
    </div>
  </div>
</template>

<script>

import { Event } from '../events';
import * as CONFIG from '../config.js'

export default {
  name: 'Navigation',
  data(){
    return {
      user: null
    }
  },
  methods: {
    logout(){
      // let uri = 'http://localhost:8888/logout';
      // axios.post(uri, {
      //   username: this.username,
      //   password: this.password,
      //   email: this.email
      // }).then(response => {
      //   this.user = response.data.user;
      //   this.errors = null;
      //   this.$store.dispatch('setToken', response.data.token);
      //   this.$store.dispatch('setUser', response.data.user);
      // }).catch(e => {
      //   this.errors = e.response.data.error;
      // })

      // this.$socket.emit('logout', this.$store.state.user.username);
      this.$store.dispatch('logout');
    }
  },
  computed: {
    isUserLoggedIn(){
      return this.$store.getters.getCurrentState.isUserLoggedIn;
    }
  },
  created(){
    // Event.$emit('event');
    // Event.$on('event', /* handler */);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
