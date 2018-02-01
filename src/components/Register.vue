<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form action="">
    	<input type="text" placeholder="login">
    	<input type="password" placeholder="password">
    	<input type="submit" value="register">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      msg: 'Register'
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
