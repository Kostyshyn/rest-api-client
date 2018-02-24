// general
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
// user
import UsersAll from '@/components/user/UsersAll'
import User from '@/components/user/User'
import Chat from '@/components/user/Chat'
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
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
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
      props: true
    }
  ]
})
