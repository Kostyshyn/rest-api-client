// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import store from '@/store'
import socketio from 'socket.io-client'
import * as CONFIG from './config.js'
import service from './services'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VModal from 'vue-js-modal'

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(VModal);

sync(store, router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  beforeCreate(){
    service.initialState(this);
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)){
    if (!store.state.isUserLoggedIn){
      next({
        path: '/login'
      });
    } else {
      next();
    }
  } else {
    next()
  }
})
