<template>
  <div class="user-wrapper">
    <div v-if="user">
      <h4>{{ user.username }}</h4>
      <em>followers: {{ user.followers.length }}</em>
      <em>following: {{ user.follows.length }}</em>
      <br>
      <button @click="follow">{{ followStatus }}</button>
      <br>
      <hr>
      <router-link
        :to="{ path: `/chat/${ user.href }` }"
        class=""
        exact
      >chat with {{ user.username }}</router-link> 
    </div>
    <div v-if="errors" v-for="error in errors">
      {{ error.message }}
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import * as CONFIG from '../../config.js'
import service from '../../services'

export default {
  name: 'User',
  data(){
    return {
      user: null,
      href: this.$route.params.href,
      errors: null
    }
  },
  methods: {
    getUser(){
      let uri = CONFIG.ROOT_URI + '/api/users/' + this.href;
      axios.get(uri).then(response => {
        // console.log(response.data.user);
        this.user = response.data.user;
      }).catch(e => {
        if (e.response.data.errors){
          this.errors = e.response.data.errors;
        } else {
          console.error(e);
        }
      });
    },
    follow(){
      var w = window.innerWidth;
      var mobile = false;
      if ( w < 769 ){
        mobile = true;
      };
      service.follow(this, mobile);
    }
  },
  computed: {
    followStatus(){
      if (this.$store.getters.getCurrentState.isUserLoggedIn){
        var follows = this.user.followers;
        var follower = this.$store.getters.getUser;
        var status = isFollow(follows, follower);
        return status ? 'Unfollow' : 'Follow';
      } else {
        return 'Follow';
      }
    }
  },
  created(){
    this.getUser();
  }
}

function isFollow(followers, follows){ // array of followers and follows object
  var found = false;
  for (var i = 0; i < followers.length; i++){
    if (followers[i]._id == follows.id){
      found = true;
      break;
    }
  }
  return found;
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
