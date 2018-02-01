<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form action="" @submit.prevent="register">
      <input type="text" placeholder="username" v-model="username">
      <input type="password" placeholder="password" v-model="password">
      <button type="submit">Register</button>
    </form>
 	<h2 v-if="user">Hello, {{ user.username }}</h2>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      msg: 'Register',
      username: '',
      password: '',
      user: null,
      errors: []
    }
  },
  methods: {
    register () {
      let uri = 'http://localhost:8888/users/register';
      axios.post(uri, {
        credentials: {
          username: this.username,
          password: this.password
        }
      }).then(response => {
        console.log(response.data)
        this.user = response.data.user
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
