<template>
  <div class="login-wrapper">
    login
    <button @click="userLogin">登陆</button>
  </div>
</template>
<script>
export default {
  methods: {
    userLogin() {
      let vm = this ;
      // 模拟登陆权限
      // this.axios.get('/login').then((res) => {

      var extendsRoutes =  require('../router/addroutes').menus
      // console.log(extendsRoutes);
      // 存储菜单
      sessionStorage.setItem('menus', JSON.stringify(extendsRoutes[0].children));
      sessionStorage.setItem('routes', JSON.stringify(extendsRoutes));
      //动态添加路由
      vm.$router.addRoutes(extendsRoutes);
      //跳转到应用界面
      vm.$router.push('/');

      
      // })
    }
  }
}
</script>

<style scoped>
  .login-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
