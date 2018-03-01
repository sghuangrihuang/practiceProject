<template>
  <web class="web" src="https://www.baidu.com" @error="onError" @pagefinish="onPagefinish" @pagestart="onPagestart"></web>
</template>

<script>
export default {
  methods: {
    onError() {
      console.log('onError');
    },
    onPagefinish() {
      console.log('onPagefinish');
    },
    onPagestart() {
      console.log('onPagestart')
    }
  }
}
</script>

<style scoped>
.web {
  width: 750px;
  height: 500px;
}
</style>
