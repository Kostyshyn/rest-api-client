<template>
  <b-row>
    <b-col lg="6" md="8" sm="10" offset-sm="1"  offset-md="2" offset-lg="3">
      <div class="login-form">
        <h1>{{ msg }}</h1>
        <form action="" @submit.prevent="login">
          <input type="text" placeholder="username or email" v-model="userInput">
          <input type="password" placeholder="password" v-model="password">
          <button type="submit" class="button main-button">Login</button>
        </form>
        <ul v-if="loginErrors" class="auth-errors">
          <li v-for="e in loginErrors">{{ e.message }}</li>
        </ul>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import service from '../services'
export default {
  name: 'Login',
  data(){
    return {
      msg: 'Login',
      userInput: '',
      password: '',
      loginErrors: null
    }
  },
  methods: {
    login(){

      var w = window.innerWidth;
      var mobile = false;
      if ( w < 769 ){
        mobile = true;
      };
      
      service.login(this, {
        userInput: this.userInput,
        password: this.password
      }, mobile);
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