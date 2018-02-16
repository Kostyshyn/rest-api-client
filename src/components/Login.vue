<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form action="" @submit.prevent="login">
      <input type="text" placeholder="username or email" v-model="userInput">
      <input type="password" placeholder="password" v-model="password">
      <button type="submit">Login</button>
    </form>
    <ul v-if="errors">
      <li v-for="e in errors">{{ e.message }}</li>
    </ul>
  </div>
</template>

<script>

import axios from 'axios'
import * as CONFIG from '../config.js'

export default {
  name: 'Login',
  data(){
    return {
      msg: 'Login',
      userInput: '',
      password: '',
      user: null,
      errors: null
    }
  },
  methods: {
    login(){
      let uri = CONFIG.ROOT_URI + '/login';
      axios.post(uri, {
        userInput: this.userInput,
        password: this.password,
      }).then(response => {
        this.user = response.data.user;
        this.errors = null;
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$socket.emit('authenticate', response.data.token);
      }).catch(e => {
        this.errors = e.response.data.error;
      })
    }
  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
