<template>
  <div>
    Profile

    {{ user.username }}
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data(){
    return {
      
    }
  },
  methods: {

  },
  computed: {
    user(){
      return this.$store.getters.getUser;
    }
  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
