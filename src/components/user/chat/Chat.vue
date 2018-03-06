<template>
  <div class="chat">
    <div class="chat-header box">
      
    </div>
    <div class="messages">
        <div class="from">
          <div class="message text-wrapping">
            Lorem ipsum dolor.
          </div>
        </div>

        <div class="to">
          <div class="message text-wrapping">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </div>
        </div>
        <div class="to">
          <div class="message text-wrapping">
            Loremdfldvgbj;lgjbslfvsjdbfvl;jsdbvjlsdb
          </div>
        </div>
    </div>
    <div class="chat-form">
        <textarea name="" id="" cols="30" rows="1" style="width: 100%"></textarea>
        <br>
        <button>Send</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data(){
    return {
      messages: null,
      users: null
    }
  },
  methods: {

  },
  computed: {

  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat {
  position: relative;
}
.chat-header {
  height: 50px;
  position: fixed;
  margin: -20px 0px 0px -15px;
  width: 100%;
  background-color: #fff;
}
.messages {
  padding-top: 55px;
  display: flex;
  flex-direction: column;
}
.message {
  width: ;
  display: inline-block;
  height: auto;
  padding: 7px 12px 5px 12px;
  line-height: 20px;
  font-weight: bold;
  color: #737373;
  font-size: 16px;
  margin: 10px 0px 5px 0px;
  border-radius: 15px;
}
.from {
  align-self: flex-end;
}
.to .message {
  background-color: #d6d6d6;
  border: 3px solid #d6d6d6;
}
.from .message {
  background-color: #fff;
  border: 3px solid #41e4de;
  text-align: right;
}

</style>
