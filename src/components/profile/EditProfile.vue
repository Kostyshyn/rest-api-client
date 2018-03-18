<template>
  <div class="profile" v-if="user">
    <b-row>
      <b-col lg="4" md="5" sm="6" xs="12">
        <div class="profile-image-wrap">
          <div class="profile-image box">
            <img :src="root + '/' + user.profile_img" height="128" width="128" alt="profile-image">
          </div>
        </div>
        <div class="profile-image-uploading">
          <input type="file" @change="imgSelected" style="display: none" ref="fileInput">
        </div>
        <button class="button" @click="$refs.fileInput.click()">Select</button>
        <button class="button" @click="imgUpload">Upload</button>
      </b-col>
      <b-col lg="8" md="7" sm="6" xs="12">
        <div class="profile-main">
          <div class="profile-info-edit">
            <h1 class="profile-username">{{ user.username }}</h1>
            <input type="text" placeholder="username" v-model="username">
            <input type="text" placeholder="email" v-model="email">
            <input type="password" placeholder="password" v-model="password">
            <button class="button" @click="updateUser">Save</button>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import * as CONFIG from '../../config.js'
import service from '../../services'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/cog'

export default {
  name: 'Profile',
  data(){
    return {
      user: null,
      userImg: null,
      root: CONFIG.ROOT_URI,
      username: null,
      password: null,
      email: null
    }
  },
  components: {
    Icon
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
    updateUser(){

      console.log('update')
      // service.logout(this)

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
          console.log(this.user.profile_img)
          this.$store.dispatch('setUser', response.data.user);
          if (window.localStorage){
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
          this.userImg = null;
        }).catch(e => {
          console.log(e.response.data.errors[0].message);
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
.profile-username {
  font-weight: 450;
  color: #737373;
}
.profile {
  padding: 30px 0px;
  position: relative;
}
.profile-image-wrap {
  text-align: center;
}
.profile-image {
  display: inline-block;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  height: 128px;
  width: 128px;
}
.profile-image img {
  width: 100%;
  height: auto;
}
.profile-main {
  display: flex;
  justify-content: space-between;
}
.profile-info {
  width: 100%;
}
.profile-control {
  /*padding: 5px;*/
}
.profile-info-edit {
  padding: 0px;
}
@media screen and (max-width: 575px){
  .profile-username {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
