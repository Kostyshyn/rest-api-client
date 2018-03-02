<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <navigation />
    <div class="page">
    	<b-container>
		    <transition name="fade" mode="out-in">

				<router-view></router-view>
				
		    </transition>
	    </b-container>
    </div>
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

<style lang="scss">
	@import "./assets/scss/style.scss"


</style>
