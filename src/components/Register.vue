<template>
  <b-row>
    <b-col lg="6" md="8" sm="10" offset-sm="1"  offset-md="2" offset-lg="3">
      <div class="register-form">
        <h1>{{ msg }}</h1>
        <form action="" @submit.prevent="register">
          <input type="text" placeholder="username" v-model="username">
          <input type="text" placeholder="email" v-model="email">
          <input type="password" placeholder="password" v-model="password">
          <button type="submit" class="button main-button">Register</button>
        </form>
     	  <h2 v-if="user">Hello, {{ user.username }}</h2>
        <ul v-if="errors" class="auth-errors">
          <li v-for="e in errors">{{ e.message }}</li>
        </ul>
      </div>
    </b-col>
  </b-row>
</template>

<script>

import service from '../services'

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

      service.register(this, {
        username: this .username,
        email: this.email,
        password: this.password
      });
      
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
