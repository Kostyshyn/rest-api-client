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
            <div class="heading-m relation-show-m">followers:<span v-if="followers" @click.prevent="showFollowers">{{ followers.length }}</span></div>
            <modal name="followers" :pivotY="0.2" :width="320" height="auto" :maxHeight="600" :scrollable="true">
              <div class="pad-15-wrapper">
                <div class="heading-m relation-heading">Followers
                  <div class="close-btn" @click="$modal.hide('followers')">
                    <span></span>
                    <span></span>
                  </div>
                </div>                
              </div>
              <div class="modal-relations-wrapper">
                <div v-for="follower in followers">
                  <router-link
                    :to="{ path: `/users/${ follower.href }` }"
                    class="relation-link pad-15-wrapper box-l">
                    <img :src="root + '/' + follower.profile_img" alt="" class="s-profile-img">
                    <span v-if="follower.online"class="user-online-indicator"></span>
                    {{ follower.username }}
                  </router-link> 
                </div>
              </div>
            </modal>
            <div class="heading-m relation-show-m">follows:<span v-if="follows" @click.prevent="showFollows">{{ follows.length }}</span></div>
            <modal name="follows" :pivotY="0.2" :width="320" height="auto" :maxHeight="600" :scrollable="true">
              <div class="pad-15-wrapper">
                <div class="heading-m relation-heading">Following
                  <div class="close-btn" @click="$modal.hide('follows')">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
              <div class="modal-relations-wrapper">
                <div v-for="following in follows">
                  <router-link
                    :to="{ path: `/users/${ following.href }` }"
                    class="relation-link pad-15-wrapper box-l">
                    <img :src="root + '/' + following.profile_img" alt="" class="s-profile-img">
                    <span v-if="following.online"class="user-online-indicator"></span>
                    {{ following.username }}
                  </router-link>        
                </div>
              </div>
            </modal>
            <br><br>
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
      followers: null,
      follows: null,
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
        this.user = response.data.user;
      }).catch(e => {
        if (e.response.data.errors){
          this.errors = e.response.data.errors;
        } else {
          console.error(e);
        }
      });
    },
    getRelations(){
      let uri = CONFIG.ROOT_URI + '/api/users/' + this.href + '/relations';
      axios.get(uri).then(response => {
        this.followers = response.data.followers;
        this.follows = response.data.follows;
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
    showFollowers(){
      if (this.followers.length > 0){
        this.$modal.show('followers');
      }
    },
    showFollows(){
      if (this.follows.length > 0){
        this.$modal.show('follows');
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
    this.getRelations();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile-username {
  font-weight: 450;
  color: #9a9a9a;
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
  box-shadow: 0px 0px 0px 2px #fff, 0px 0px 0px 4px #41ede1;
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
.profile-info .relation-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.profile-control {
  display: inline-block;
}
.modal-relations-wrapper {
  padding: 15px;
  /*background-color: #f4f5f7;*/
  background-color: #e9ecef;
  border-top: 1px solid #dee2e6;
  height: auto;
  max-height: 600px;
  overflow-y: auto;
}
.modal-relations-wrapper::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
}
.modal-relations-wrapper::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}
.modal-relations-wrapper::-webkit-scrollbar-thumb {
  background-color: #d6d6d6;
}
.relation-show-m {
  padding: 0px;
  margin-bottom: 10px;
}
.relation-show-m span {
  color: #41ede1;
  cursor: pointer;
  display: inline-block;
  padding: 0px 5px;
  margin-left: 5px;
}
.relation-link {
  position: relative;
  display: inline-block;
  width: 100%;
  background-color: #fff;
  margin-bottom: 10px;
  z-index: 3;
  border-radius: 4px;
  text-decoration: none;
  color: #9a9a9a;
  font-size: 18px;
}
.relation-link:hover {
  color: #737373;
}
.relation-link .s-profile-img {
  margin-right: 5px;
}
.relation-link .user-online-indicator {
  z-index: -1;
}
@media screen and (max-width: 575px){
  .profile-control {
    /*padding-top: 35px;*/
    /*position: absolute;*/
    /*top: -140px;*/
  }
  .modal-relations-wrapper {
    height: calc(100vh - 105px);
  }
  .profile-username {
    text-align: center;
    margin-top: 20px;
  }
  .relation-link {
    font-size: 20px;
  }
}
</style>
