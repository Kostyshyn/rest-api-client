<template>
  <div class="hello">
    <input type="text" v-model="msg">
    <button @click="click">send</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      msg: null
    }
  },
  methods: {
    click(){
      if (this.socket){
        this.socket.emit('send.message', this.msg);
      }
    }
  },
  computed: {
    socket(){
      return this.$store.getters.getSocket;
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
