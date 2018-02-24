<template>
  <div>
    <router-link
    to="/"
    class=""
    active-class="active"
    exact
    >Home</router-link>
    <router-link
    to="/users"
    class=""
    active-class="active"
    exact
    >Users</router-link>
    <div v-if="!isUserLoggedIn">
      <router-link
      to="/login"
      class=""
      active-class="active"
      >Login</router-link>
      <router-link
      to="/register"
      class=""
      active-class="active"
      >Register</router-link>
    </div>
    <div v-if="isUserLoggedIn">
      <a href="#" @click="logout">Logout</a> 
      <router-link
      to="/profile"
      class=""
      active-class="active"
      >Profile</router-link>     
    </div>
  </div>
</template>

<script>

import { Event } from '../events';
import service from '../services'

export default {
  name: 'Navigation',
  data(){
    return {
      user: null
    }
  },
  methods: {
    logout(){

      service.logout(this)

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
