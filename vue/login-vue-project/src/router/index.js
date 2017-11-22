import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/home'
import User from '@/components/user'
import Admin from '@/components/admin'
import Login from '@/components/login'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home
    }, 
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        requiresAuth: true,
        adminAuth: false,
        userAuth: true
      }
    }, 
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        adminAuth: true,
        userAuth: false
      }
    }, 
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})




export default router;