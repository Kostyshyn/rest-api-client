<template>
  <div class="profile">
    <div v-if="user">
      Profile
      <div>
        <div class="profile-image-wrap">
          <div class="profile-image" v-if="!!user.profile_img">
            <img :src="root + '/' + user.profile_img" height="128" width="128" alt="profile-image">
          </div>
          <div class="profile-image" v-else>
            <img src="../../assets/128_profile_placeholder.png" height="128" width="128" alt="profile-image">
          </div>
        </div>
        <div class="profile-image-uploading">
          <input type="file" @change="imgSelected">
        </div>
        <button @click="imgUpload">upload</button>
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
      userImg: null,
      root: CONFIG.ROOT_URI
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
      let fd = new FormData();
      let uri = CONFIG.ROOT_URI + '/api/users/' + this.href;
      let token = this.$store.getters.getToken;
      if (this.userImg){
        fd.append('profile-image', this.userImg, this.userImg.name);
        axios.put(uri, fd, {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
          }
        }).then(response => {
          this.user = response.data.user;
          this.userImg = null;
        }).catch(e => {

        });
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
h1, h2 {
  font-weight: normal;
}
.profile-image-wrap {
  display: inline-block;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  height: 128px;
  width: 128px;
}
.profile-image {
  
}
.profile-image img {
  width: 100%;
  height: auto;
}

</style>
