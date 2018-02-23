<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form action="" @submit.prevent="register">
      <input type="text" placeholder="username" v-model="username">
      <input type="text" placeholder="email" v-model="email">
      <input type="password" placeholder="password" v-model="password">
      <button type="submit">Register</button>
    </form>
 	  <h2 v-if="user">Hello, {{ user.username }}</h2>
    <ul v-if="errors">
      <li v-for="e in errors">{{ e.message }}</li>
    </ul>
  </div>
</template>

<script>

import axios from 'axios'
import * as CONFIG from '../config.js'

export default {
  name: 'Register',
  data(){
    return {
      msg: 'Register',
      username: '',
      password: '',
      email: '',
      user: null,
      errors: null
    }
  },
  methods: {
    register(){
      let uri = CONFIG.ROOT_URI + '/api/register';
      axios.post(uri, {
        username: this.username,
        password: this.password,
        email: this.email
      }).then(response => {
        this.user = response.data.user;
        this.errors = null;
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
      }).catch(e => {
        this.errors = e.response.data.error;
      })
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
