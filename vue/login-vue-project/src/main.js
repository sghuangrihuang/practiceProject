// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/store'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('lbUser'));
    if ( !authUser || !authUser.token ) {
      next({ name: 'login' })
    } else if ( to.meta.adminAuth ) {
    if( authUser.data.role_id == 'admin' ) {
        next();
      }
    } else if ( to.meta.userAuth ) {
      if( authUser.data.role_id == 'user' ) {
        next();
      }
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
