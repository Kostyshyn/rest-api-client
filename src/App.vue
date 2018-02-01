<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <navigation />
    <router-view/>
  </div>
</template>

<script>

import Navigation from '@/components/Navigation'

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style>
#app {

}
</style>
