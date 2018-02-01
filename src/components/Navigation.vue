<template>
  <div>
    <router-link
    to="/"
    class=""
    active-class="active"
    exact
    >Home</router-link>
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
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
