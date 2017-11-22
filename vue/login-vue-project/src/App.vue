<template>
  <div id="app">
    <v-footer></v-footer>
    <router-view/>
  </div>
</template>

<script>
import footer from  './components/footer'

export default {
  name: 'app',
  components: {
    "v-footer": footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
