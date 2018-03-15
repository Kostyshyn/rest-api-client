<template>
  <div class="profile">
    <div v-if="user">
      Profile
      <div>
        <div class="profile-image-wrap">
          <div v-if="!!user.profile_img" class="profile-image">
            yes
          </div>
          <div v-else class="profile-image">
            <img src="../../assets/128_profile_placeholder.png" height="128" width="128" alt="profile-image">
          </div>
          <div class="profile-image-uploading">
            <input type="file" @change="imgSelected">
            <button @click="imgUpload">upload</button>
          </div>
        </div>
      </div>
      <h2>{{ user.username }}</h2>
      <hr>
      <em>followers: {{ user.followers.length }}</em>
      <br>
      <em>following: {{ user.follows.length }}</em>
      <br>
      <br>
      <button class="button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as CONFIG from '../../config.js'
import service from '../../services'

export default {
  name: 'Profile',
  data(){
    return {
      user: null,
      userImg: null
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
    logout(){

      service.logout(this)

    },
    imgSelected(e){
      this.userImg = e.target.files[0];
      // console.log(e.target.files);
    },
    imgUpload(){
      var fd = new FormData();
      if (this.userImg){
        fd.append('profile-image', this.userImg, this.userImg.name);
      }
    }
  },
  computed: {
    href(){
      return this.$store.getters.getUser.href;
    }
  },
  created(){
    this.getUser();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
