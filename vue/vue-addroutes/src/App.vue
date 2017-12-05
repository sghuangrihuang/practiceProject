<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    let isLogin = sessionStorage.getItem("menus");
    if (!isLogin) {
      return this.$router.push("/login");
    } else {
      let localRoutes = sessionStorage.getItem("routes");
      if (localRoutes) {
        let userPath = JSON.parse(localRoutes);
        this.$router.addRoutes(
          userPath.concat([{
            path: "*",
            redirect: "/404"
          }])
        );
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
