<template>
  <div class="hello">
    <h3>All users</h3>
    <ul v-if="users">
      <li v-for="user in users">
        <router-link
        :to="{ path: `/users/${ user.href }` }"
        class=""
        active-class="active"
        >{{ user.username }}</router-link>
      </li>
    </ul>    
  </div>
</template>

<script>
import axios from 'axios'
import * as CONFIG from '../../config.js'

export default {
  name: 'UsersAll',
  data(){
    return {
      msg: null,
      users: null,
      errors: null
    }
  },
  methods: {
    getAllUsers(){
      let uri = CONFIG.ROOT_URI + '/api/users';
      console.log('uri', uri);
      axios.get(uri).then(response => {
        this.users = response.data.users;
        console.log(response.data.users);
      }).catch(e => {
        console.log(e);
        // if (e.response.data.errors){
        //   this.errors = e.response.data.errors;
        // } else {
        //   console.error(e);
        // }
      });

      // var token = this.$store.getters.getToken;
      // let uri = CONFIG.ROOT_URI + '/api/users';
      // axios({
      //   url: uri,
      //   method: 'get',
      //   headers: {
      //     'x-access-token': token,
      //     'Content-Type': 'application/json'
      //   }
      // }).then(response => {
      //   this.users = response.data.users;
      // }).catch(e => {
      //   if (e.response.data.error){
      //     context.errors = e.response.data.error;
      //   } else {
      //     console.error(e);
      //   }
      // });      
    }
  },
  computed: {

  },
  created(){
    this.getAllUsers();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
