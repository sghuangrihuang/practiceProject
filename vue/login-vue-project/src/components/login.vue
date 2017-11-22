<template>
  <div class="login">
    <div v-show="!isLoginIn">
      <h1>你好， 请登陆账号</h1>
      <input type="text" v-model="inputVal">
      <button @click="loginUser">登录</button>
    </div>
    <div v-show="isLoginIn">
      <h1>你好, user</h1>
      <button @click="checkOut">退出</button>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      inputVal: null
    }
  },
  computed : {
    ...mapState({
      isLoginIn: state => state.isLoginIn,
    })
  },
  methods: {
    ...mapActions({
      changeLogin: "changeLogin"
    }),
    loginUser() {
      const authUser = {};
      this.axios.get('/api/users/getUserInfo').then((res) => {
        if (res.status == 200) {
          authUser.data = res.data.data;
          authUser.token = res.data.data.token;
          this.changeLogin({bool: true});
          window.localStorage.setItem('lbUser', JSON.stringify(authUser));
          if ( authUser.data.role_id == 'admin' ) {
            this.$router.push('/admin');
          } else {
            this.$router.push('/user');
          }
        } else {
          this.changeLogin({bool: false});
        }
      })
    },
    checkOut() {
      this.changeLogin({bool: false});
      window.localStorage.removeItem('lbUser')
      this.$router.push('/login');
    }
  }

}
</script>
<style scoped>

</style>


