<template>
  <div class="wrapper">
    <image :src="logo" class="logo"></image>
    <text class="greeting">The environment is ready</text>
    <text class="message">Now, let's use Vue.js to build your Weex app</text>
    <text class="text" @click="jump('page/list')">页面跳转list</text>
    <text class="text" @click="jump('page/loading')">页面跳转loading</text>
  </div>
</template>

<script>
  const navigator = weex.requireModule('navigator');
  const modal = weex.requireModule('modal');

  export default {
    data () {
      return {
        logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png',
      }
    },
    methods: {
      jump(path) {
        var navigatorPath = ''
        var platform = weex.config.env.platform

        let host = "http://192.168.40.15:8081"
        if (platform === 'Web') {
          // web端
          // http://192.168.40.15:8081/list/page.html
          navigatorPath = `${host}/${path}.html` 
        } else {
          // 客户端
          navigatorPath = `${host}/dist/${path}.js` 
        }
        navigator.push({
          url: navigatorPath,
          animated: 'true'
        }, ()=> {
          modal.toast({
            message: 'callback jump'
          })
        })
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    justify-content: center;
    align-items: center;
  }
  .wrapper .greeting {
    font-size: 60px;
  }
  .logo {
    border-width: 1px;
    border-style: solid;
    border-color: #333;
    width: 200px;
    height: 200px;
  }
  .greeting {
    margin-top: 70px;
    font-size: 50px;
    color: #41B883;
  }
  .message {
    margin: 30px;
    font-size: 32px;
    color: #727272;
  }
  .text {
    font-size: 40px;
  }
</style>
