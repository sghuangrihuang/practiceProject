<template>
  <div>
    <text class="text">weex的text组件</text>
    <text class="text">{{message}}</text>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'weex组件之text'
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 40px;
}
</style>
