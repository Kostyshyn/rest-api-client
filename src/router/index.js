// general
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Home from '@/components/Home'
import Profile from '@/components/Profile'
// user
import UsersAll from '@/components/user/UsersAll'
import User from '@/components/user/User'
import Chat from '@/components/user/chat/Chat'
import Chats from '@/components/user/chat/Chats'
// auth
import Register from '@/components/Register'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: (to, from, next) => {
        var currentUser = store.getters.getUser;
        if (currentUser){
          next('/profile');
        } else {
          next();
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        var currentUser = store.getters.getUser;
        if (currentUser){
          next('/profile');
        } else {
          next();
        }
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/users',
      name: 'UsersAll',
      component: UsersAll
    },
    {
      path: '/users/:href',
      name: 'User',
      component: User,
      props: true,
      beforeEnter: (to, from, next) => {
        var currentUserHref = store.getters.getUser ? store.getters.getUser.href : null;
        var userHref = to.params.href;
        if (currentUserHref && currentUserHref == userHref){
          next('/profile');
        } else {
          next();
        }
      }
    },
    {
      path: '/chat',
      name: 'Chats',
      component: Chats,
      children: [
        {
          path: ':href',
          name: 'Chat',
          component: Chat,
          meta: { requiresAuth: true },
          props: true,
          beforeEnter: (to, from, next) => {
            var currentUserHref = store.getters.getUser ? store.getters.getUser.href : null;
            var userHref = to.params.href;
            if (currentUserHref && currentUserHref == userHref){
              next('/profile');
            } else {
              next();
            }
          }
        }
      ]
    },
  {
    path: '*',
    redirect: '/'
  }
  ]
})
