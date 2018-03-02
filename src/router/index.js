// general
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Home from '@/components/Home'
import Profile from '@/components/Profile'
// user
import UsersAll from '@/components/user/UsersAll'
import User from '@/components/user/User'
import Chat from '@/components/user/Chat'
// auth
import Register from '@/components/Register'

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
      component: Register
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
    }
  ]
})
