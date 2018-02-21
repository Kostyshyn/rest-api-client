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

import service from '../services'

export default {
  name: 'Login',
  data(){
    return {
      msg: 'Login',
      userInput: '',
      password: '',
      errors: null
    }
  },
  methods: {
    login(){

      service.login(this, {
        userInput: this.userInput,
        password: this.password
      });

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
