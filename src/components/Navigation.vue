<template>
  <div class="navigation-top box">
    <b-container>
      <b-row>
  
        
        <b-col lg="9">
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
        <b-col lg="3" v-if="!isUserLoggedIn">

          <div class="auth-links">
          
            <ul>
              <li>
                <router-link
                to="/login"
                class=""
                >Login</router-link>
              </li>
              <li>
                <router-link
                to="/register"
                class=""
                >Register</router-link>                
              </li>
            </ul>
      
          </div>
        </b-col>
        <b-col lg="3" v-if="isUserLoggedIn">

          <div class="user-links">
            
            <ul>
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
  </div>
</template>

<script>

import { Event } from '../events';
import service from '../services'

export default {
  name: 'Navigation',
  data(){
    return {
      user: null
    }
  },
  methods: {
    logout(){

      service.logout(this)

    }
  },
  computed: {
    isUserLoggedIn(){
      return this.$store.getters.getCurrentState.isUserLoggedIn;
    }
  },
  created(){
    // Event.$emit('event');
    // Event.$on('event', /* handler */);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

</style>
