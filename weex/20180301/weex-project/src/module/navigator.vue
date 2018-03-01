<template>
  <div>
    <text class="text" @click="jump">页面跳转</text>
  </div>
</template>

<script>
const navigator = weex.requireModule('navigator');
const modal = weex.requireModule('modal')

export default {
  methods: {
    jump() {
      navigator.push({
        url: 'https://www.baidu.com',
        animated: 'true'
      }, ()=> {
        modal.toast({
          message: 'callback: jump'
        })
      })
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 40px;
}
</style>
