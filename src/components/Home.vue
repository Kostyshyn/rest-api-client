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
  sockets: {
    custom(val){
      console.log(val);
    },
    disconnect(){
      console.log('socket disconnect')
    }
  },
  methods: {
    click(){
      var s = this.$store.getters.getSocket;
      if (s){
        s.on('custon', function(val){
          console.log(val);
        });
        s.emit('cl', this.msg);
      }
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
