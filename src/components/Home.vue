<template>
  <div class="main-page">
    <input type="text" v-model="msg">
    <button @click="click">send</button>
    <ul v-if="users">
      <li v-for="user in users">{{ user.username }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      msg: null,
      users: null
    }
  },
  methods: {
    click(){
      if (this.socket){
        this.socket.emit('send.message', this.msg);
      }
    },
    getOnlineUsers(){
      var self = this;
      // if (this.socket){
      //   this.socket.emit('get.online.users');
      //   this.socket.on('online.users', function(users){
      //     self.users = users;
      //     console.log(users);
      //   });
      // }
    }
  },
  computed: {
    socket(){
      return this.$store.getters.getSocket;
    }
  },
  created(){
    this.getOnlineUsers();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
