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
      this.$store.dispatch('logout');
      this.$socket.emit('logout');
      this.$socket.disconnect();
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
