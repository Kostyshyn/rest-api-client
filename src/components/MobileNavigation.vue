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
        <li>
          <a href="#" @click="logout">Logout</a>
        </li>
        <li>
          <router-link
            to="/profile"
            class=""
          >Profile</router-link>
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

import service from '../services'

export default {
  name: 'MobileNavigation',
  data(){
    return {
      user: null,
      navbarOpen: false
    }
  },
  computed: {
    isUserLoggedIn(){
      return this.$store.getters.getCurrentState.isUserLoggedIn;
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
