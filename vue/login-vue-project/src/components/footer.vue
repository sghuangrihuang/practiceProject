<template>
  <div class="footer">
    <router-link to="/admin">admin</router-link>
    <router-link to="/home">home</router-link>
    <router-link to="/user">user</router-link>
    <router-link to="/login">login</router-link>
  </div>
</template>
<script>
  export default {
    
  }
</script>
<style scoped>
  .footer {
    border-top: 1px solid #999;
    display: flex;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 44px;
    line-height: 44px;
  }
  .footer a {
    flex: 1;
    text-decoration: none;
    text-align: center;
  }
</style>


