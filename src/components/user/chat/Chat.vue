<template>
  <b-row>
    <b-col lg="6" md="10" sm="12" offset-md="1" offset-lg="3" class="chat-column">
      <div class="chat">
        <div class="chat-header box">
          Username
          <div class="last-seen-indicator">
            last seen 2 h ago
          </div>
        </div>
        <div class="messages-wrapper" ref="messages-wrapper">
          <div class="messages" v-if="messages" ref="messages">

              <div v-for="message in messages" class="" :class="message.my ? 'from' : 'to' ">
                <div class="message text-wrapping">
                  {{ message.text }}
                </div>
                <span class="message-date">date</span>
              </div>

          </div>
        </div>
        <div class="chat-form">
            <textarea-autosize   
            :min-height="40" 
            :max-height="200" 
            name="" id="" 
            v-model="newMessageText" 
            placeholder="Write message ..."
            @keydown.native="send"></textarea-autosize>
            <div class="send-message-wrapper">
              <button class="send-message" @click="send"><icon name="angle-right"></icon></button>
            </div>
          </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>

import Icon from 'vue-awesome/components/Icon'


export default {
  name: 'Chat',
  data(){
    return {
      messages: [
        { my: true, text: 'wgferg' },
        { my: false, text: 'wgferg' },
        { my: true, text: 'wgferg' },
        { my: false, text: 'wgferg' },
        { my: true, text: 'wgferg' },
        { my: false, text: 'wgferg' },
        { my: true, text: 'wgferg' },
        { my: false, text: 'wgferg' }
      ],
      users: null,
      newMessageText: null
    }
  },
  components: {
    Icon
  },
  methods: {
    send(e){
      if (!e.shiftKey && e.keyCode == 13 || e.type == 'click'){
        e.preventDefault();
        var self = this;
        if (this.newMessageText != null && this.newMessageText.trim() != ''){
          this.messages.push({
            my: true,
            text: this.newMessageText
          });
          this.scroll();
          this.newMessageText = null;
        }
      }
    },
    scroll(){
      var self =  this;
      setTimeout(function(){
        $(self.$refs['messages-wrapper']).animate({
          scrollTop: self.$refs['messages-wrapper'].scrollHeight
        }, 500);

        // self.$refs['messages-wrapper'].scrollTop = self.$refs['messages-wrapper'].scrollHeight;

      }, 0);
    }
  },
  computed: {

  },
  created(){
    this.scroll();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat {
  position: relative;
  width: 100%;
}
.chat-column {
  padding: 0px;
}
.chat-header {
  min-height: 50px;
  height: auto;
  width: 100%;
  background-color: #fff;
  padding: 15px;
  position: relative;
}
.last-seen-indicator {
  padding: 5px 0px 0px 0px;
  text-align: center;
  font-size: 14px;
  color: #737373;
  font-weight: bold;
  position: absolute;
  top: 60px;
  opacity: .6;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}
.messages-wrapper {
  height: calc(100vh - 207px);
  overflow-y: auto;
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
/*  display: flex;
  flex-direction: column;
  justify-content: flex-end;*/
}
.messages {
  padding: 15px;
  display: flex;
  flex-direction: column;
  height: auto;
}
.message {
  display: inline-block;
  height: auto;
  padding: 5px 12px 5px 12px;
  line-height: 18px;
  font-weight: bold;
  color: #737373;
  font-size: 14px;
  margin: 10px 0px 0px 0px;
  border-radius: 10px;
  transition: all .3s ease;
}
.from .message-date,
.to .message-date {
  display: block;
  font-size: 12px;
  margin-bottom: 5px;
  color: #d6d6d6;
  padding: 0px 5px;
}
.from .message-date {
  text-align: right;
}
.from {
  align-self: flex-end;
}
.to .message {
  background-color: #d6d6d6;
  border: 2px solid #d6d6d6;
}
.from .message {
  background-color: #fff;
  border: 2px solid #41e4de;
  text-align: right;
}

.chat-form {
  position: fixed;
  bottom: 0px;
  display: flex;
  padding: 15px;
  background-color: #fff;
  height: auto;
  width: 570px;
  box-shadow: 0px -4px 25px 0px rgba(46, 61, 73, 0.2);
}
.chat-form textarea {
  min-height: 40px;
  height: auto;
  width: 100%;
  outline: none;
  border: 2px solid #c2c2c2;
  padding: 5px 10px;
  color: #737373;
  font-size: 14px;
  line-height: 18px;
  margin-right: 10px;
  border-radius: 4px;
} 
.chat-form textarea::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
}

.chat-form textarea::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}
.chat-form textarea::-webkit-scrollbar-thumb {
  background-color: #d6d6d6;
}
.send-message-wrapper {
  align-self: flex-end;
}
.send-message {
  cursor: pointer;
  display: flex;
  height: 47px;
  width: 47px;
  border-radius: 4px;
  outline: none;
  border: none;
  background-color: #41e4de;
  color: #fff;
}
.send-message svg {
  height: 40px;
  width: 40px;
  margin: 0px 0px 3px 2px;
}

@media screen and (max-width: 1200px){
  .chat-form {
    width: 480px;
  }
}
@media screen and (max-width: 992px){
  .chat-form {
    width: 600px;
  }
}
@media screen and (max-width: 768px){
  .chat-form {
    width: 540px;
  }
  .messages-wrapper {
    height: calc(100vh - 187px);
  }
}
@media screen and (max-width: 575px){
  .messages-wrapper {
    border-left: none;
    border-right: none;
  }
  .message {
    padding: 7px 12px 5px 12px;
    line-height: 20px;
    font-weight: bold;
    font-size: 16px;
  }
  .chat-form {
    width: 100%;
  }
}

</style>
