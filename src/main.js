// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import store from '@/store'
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import * as CONFIG from './config.js'

export const SocketInstance = socketio(CONFIG.ROOT_URI);

Vue.use(Vuex)
Vue.use(VueSocketIO, SocketInstance)

sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  sockets: {
  	connect () {
      console.log('socket connected');
    },
    err (data) {
      console.log(data);
    }
  },
  components: { App },
  template: '<App/>'
})
