<template>
  <div id="app">

    <navigation />
    <mobile-navigation />

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
import MobileNavigation from '@/components/MobileNavigation'

export default {
  name: 'App',
  components: {
    Navigation,
    MobileNavigation
  }
}
</script>

<style lang="scss">
	@import "./assets/scss/style.scss"


</style>
