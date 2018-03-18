<template>
  <div>
    <div class="dimm" v-bind:class="{ dimmed: navbarOpen }" @click="toggle"></div>
    <div class="navigation-mobile box">
      <div class="hidden-nav-button no-select" v-bind:class="{ open: navbarOpen }" @click="toggle">
        <div class="hidden-nav-button-wrapper">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="hidden-nav-links" v-bind:class="{ open: navbarOpen }">

        <ul>
          <li>
            <router-link
            to="/"
            class=""
            exact
            @click.native="toggle"
            >Home</router-link>                
          </li>
          <li>
            <router-link
            to="/users"
            class=""
            @click.native="toggle"
            >Users</router-link>
          </li>
        </ul>  

      </div>
      <ul class="mobile-user-links" v-if="isUserLoggedIn">
        <li class="chat-link">
          <router-link
            :to="{ name: 'Chats' }"
            class="chat-nav-container"
            >
            <icon name="envelope"></icon>
            <span v-if="notifications.length > 0">{{ notifications.length }}</span>
          </router-link>
        </li>
        <li class="profile-link">
          <router-link
          to="/profile"
          class="user-nav-container"
          >
            <img :src="root + '/' + user.profile_img" alt="" class="s-profile-img">
            {{ user.username }}
          </router-link>
        </li>
      </ul>
      <ul class="mobile-auth-links" v-if="!isUserLoggedIn">
        <li>
          <router-link
          to="/login"
          class=""
          @click.native="close"
          >Login</router-link> 
        </li>
        <li>
          <router-link
          to="/register"
          class=""
          @click.native="close"
          >Register</router-link>                
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import * as CONFIG from '../config.js'
import service from '../services'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/bell'
import 'vue-awesome/icons/user-circle'

import { Event } from '../events'

export default {
  name: 'MobileNavigation',
  data(){
    return {
      notifications: [],
      navbarOpen: false,
      root: CONFIG.ROOT_URI
    }
  },
  components: {
    Icon
  },
  computed: {
    isUserLoggedIn(){
      return this.$store.getters.getCurrentState.isUserLoggedIn;
    },
    user: {
      get: function(){
        return this.$store.getters.getUser;
      },
      set: function(){
        return null
      }
    }
  },
  methods: {
    logout(){

      service.logout(this)

    },
    toggle(){
      this.navbarOpen = !this.navbarOpen;
    },
    close(){
      this.navbarOpen = false;
    }
  },
  created(){
    var self = this;
    Event.$on('notification', function(note){
      self.notifications.push(note);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
