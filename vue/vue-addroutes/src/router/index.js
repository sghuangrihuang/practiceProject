import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: (resolve) => require(['../views/login.vue'], resolve)
  }, {
    path: '/404',
    name: '404',
    component: (resolve) => require(['../views/common/404.vue'], resolve)
  }]
})
