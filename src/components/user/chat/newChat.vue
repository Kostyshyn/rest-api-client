<template>
    <b-col lg="8" md="8" sm="12">
      <div class="new-chat">new chat</div>
      <div v-if='user'>

      </div>
    </b-col>
</template>

<script>

import moment from 'moment'
import { Event } from '../../../events';
import chatService from '../../../services/chat-service'
import Icon from 'vue-awesome/components/Icon'
// import 'vue-awesome/icons/angle-right'

export default {
  name: 'Chat',
  data(){
    return {
      user: null
    }
  },
  components: {
    Icon
  },
  methods: {
    getUser(){
      this.user = this.$store.getters.getUser;
    }
  },
  computed: {
    
  },
  watch: {

  },
  created(){
    this.getUser();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-chat {
  position: fixed;
  width: 100%;
  width: 760px;
}

@media screen and (max-width: 1200px){
  .new-chat {
    width: 640px;
  }
}
@media screen and (max-width: 992px){
  .new-chat {
    width: 480px;
  }
}
@media screen and (max-width: 768px){
  .new-chat {
    width: 540px;
  }
}
@media screen and (max-width: 575px){
  .new-chat {
    width: 100%;
  }
}

</style>
