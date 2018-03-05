<template>
  <div class="navigation-top box">
    <b-container>
      <b-row>
  
        <b-col lg="9" md="7" sm="7">
          <div class="page-links">
            
            <ul>
              <li>
                <router-link
                to="/"
                class=""
                exact
                >Home</router-link>                
              </li>
              <li>
                <router-link
                to="/users"
                class=""
                >Users</router-link>
              </li>
            </ul>
            
          </div>
        </b-col>
        <b-col lg="3" md="5" sm="5" v-if="!isUserLoggedIn">

          <div class="auth-links">
          
            <ul>
              <li>
                <button class="button" @click="showLoginModal">
                  Login
                </button>
              </li>
              <li>
                <router-link
                to="/register"
                class="button main-button"
                >Register</router-link>                
              </li>
            </ul>
      
          </div>
        </b-col>
        <b-col lg="3" md="5" sm="5" v-if="isUserLoggedIn">

          <div class="user-links">
            
            <ul>
              <li class="notifications">
                <span>{{ notifications.length }}</span>
              </li>
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
                        
          </div>

        </b-col>

      </b-row>
    </b-container>
    <modal name="login" :width="350" height="auto">
      <div class="login-modal">
        <h1>Login</h1>
        <form action="" @submit.prevent="login">
          <input type="text" placeholder="username or email" v-model="userInput">
          <br>
          <input type="password" placeholder="password" v-model="password">
          <button type="submit" class="button main-button">Login</button>
        </form>
        <ul v-if="loginErrors" class="auth-errors">
          <li v-for="e in loginErrors">{{ e.message }}</li>
        </ul>
      </div>
    </modal>
  </div>

</template>

<script>

import { Event } from '../events';
import service from '../services';

export default {
  name: 'Navigation',
  data(){
    return {
      user: null,
      loginErrors: null,
      userInput: '',
      password: '',
      notifications: []
    }
  },
  methods: {
    logout(){

      service.logout(this)

    },
    login(){

      var w = window.innerWidth;
      var mobile = false;
      if ( w < 769 ){
        mobile = true;
      };

      service.login(this, {
        userInput: this.userInput,
        password: this.password
      }, mobile);

    },
    showLoginModal () {
      this.userInput = null;
      this.password = null;
      this.loginErrors = null;
      this.$modal.show('login');

    }
  },
  computed: {
    isUserLoggedIn(){
      return this.$store.getters.getCurrentState.isUserLoggedIn;
    }
  },
  created(){
    // Event.$emit('event');
    var self = this;
    Event.$on('notification', function(note){
      self.notifications.push(note);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

</style>
