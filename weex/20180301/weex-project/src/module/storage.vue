<template>
  <div>
    <text class="text" @click="setItem">setItem</text>
    <text class="text" @click="getItem">getItem</text>
    <text class="text" @click="removeItem">removeItem</text>
    <text class="text" @click="getAllKeys">getAllKeys</text>
  </div>
</template>

<script>
const storage = weex.requireModule('storage');

export default {
  methods: {
    setItem() {
      storage.setItem('storageId', '1', (e)=> {
        console.log(e);
      })
    },
    getItem() {
      storage.getItem('storageId', (e)=> {
        console.log(e);
      })
    },
    removeItem() {
      storage.removeItem('storageId', (e)=> {
        console.log(e);
      })
    },
    getAllKeys() {
      storage.getAllKeys((e)=> {
        console.log(e);
      })
    }
  }
}
</script>

<style scoped>

</style>
