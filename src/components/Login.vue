<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form action="" @submit.prevent="login">
      <input type="text" placeholder="username" v-model="username">
      <input type="password" placeholder="password" v-model="password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      msg: 'Login',
      username: '',
      password: '',
      user: null,
      errors: []
    }
  },
  methods: {
    login () {
      let uri = 'http://localhost:8888/users/login';
      axios.post(uri, {
        credentials: {
          username: this.username,
          password: this.password
        }
      }).then(response => {
        console.log(response.data.user)
      }).catch(e => {
        this.errors.push(e.error)
        console.log(e.response)
      })

      // axios.get(`http://jsonplaceholder.typicode.com/posts`)
      // .then(response => {
      //   // JSON responses are automatically parsed.
      //   console.log(response.data)
      // })
      // .catch(e => {
      //   this.errors.push(e)
      // })
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
