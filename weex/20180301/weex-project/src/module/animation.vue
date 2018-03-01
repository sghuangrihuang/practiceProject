<template>
  <div>
    <text class="text" @click="moveDom" ref="text">点击展现动画</text>
  </div>
</template>

<script>
const animation = weex.requireModule('animation');
const modal = weex.requireModule('modal')

export default {
  methods: {
    moveDom() {
      const text = this.$refs.text;
      animation.transition(text, {
        styles: {
          color: '#FF0000',
          transform: 'translate(250px, 100px)'
        },
        duration: 800,
        delay: 0,
        timingFunction: 'ease'
      }, ()=> {
        modal.toast({
          message: 'animation finished'
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

