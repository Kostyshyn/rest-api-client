<template>
  <div class="profile" v-if="user">
    <b-row>
      <b-col lg="2" md="3" sm="4" xs="12">
        <div class="profile-image-wrap">
          <div class="profile-image box">
            <img :src="root + '/' + user.profile_img" height="128" width="128" alt="profile-image">
          </div>
        </div>
      </b-col>
      <b-col lg="10" md="9" sm="8" xs="12">
        <div class="profile-main">
          <div class="profile-info">
            <h1 class="profile-username">{{ user.username }}</h1>
            <hr>
            <em>followers: {{ user.followers.length }}</em>
            <br>
            <em>following: {{ user.follows.length }}</em>
            <br>
            <br>
            <button class="button" @click="logout">Logout</button>
            <div class="profile-control">
              <b-dropdown id="profile-options-dropdown" variant="link" no-caret>
                <template slot="button-content">
                  <icon name="cog"></icon>
                </template>
                <b-dropdown-item>
                  <router-link
                  :to="{ name: 'EditProfile' }"
                  class=""
                  exact
                  >Edit profile</router-link> 
                </b-dropdown-item>
              </b-dropdown>
            </div>
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
      root: CONFIG.ROOT_URI
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
    logout(){

      service.logout(this)

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
  display: inline-block;
}
@media screen and (max-width: 575px){
  .profile-control {
    /*padding-top: 35px;*/
    /*position: absolute;*/
    /*top: -140px;*/
  }
  .profile-username {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
