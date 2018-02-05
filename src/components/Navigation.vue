<template>
  <div>
    <router-link
    to="/"
    class=""
    active-class="active"
    exact
    >Home</router-link>
    <div v-if="!isUserLoggedIn">
      <router-link
      to="login"
      class=""
      active-class="active"
      >Login</router-link>
      <router-link
      to="register"
      class=""
      active-class="active"
      >Register</router-link>
    </div>
    <a href="#" v-if="isUserLoggedIn" @click="logout">Logout</a> 
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {}
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.state.isUserLoggedIn;
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
