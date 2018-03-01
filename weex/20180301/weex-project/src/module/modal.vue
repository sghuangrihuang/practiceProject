<template>
  <div>
    <text class="text" @click="toast">toast</text>
    <text class="text" @click="modalAlert">alert</text>
    <text class="text" @click="modalConfirm">confirm</text>
    <text class="text" @click="modalPrompt">prompt</text>
  </div>
</template>

<script>
// 引用modal模块
const modal = weex.requireModule('modal')

export default {
  methods: {
    toast() {
      modal.toast({
        message: 'modal toast内容',
        duration: 1
      })
    },
    modalAlert() {
      modal.alert({
        message:'modal alert内容',
        okTitle: '好'
      }, ()=> {
        modal.toast({
          message: 'modal toast内容',
          duration: 1
        })
      })
    },
    modalConfirm() {
      modal.confirm({
        message:'modal confirm内容',
        okTitle: '好',
        cancelTitle: '否'
      }, ()=> {
        modal.toast({
          message: 'modal toast内容',
          duration: 1
        })
      })
    },
    modalPrompt() {
      modal.prompt({
        message:'modal confirm内容',
        okTitle: '好',
        cancelTitle: '否'
      }, (res)=> {
        modal.toast({
          message: res.result,
          duration: 1
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
