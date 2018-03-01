<template>
  <list class="list" @loadmore="fetch" loadmoreoffset="10">
    <header>list组件的header组件</header>
    <cell class="cell" v-for="(item, index) in lists" :key="index">
      <div class="panel">
        <text class="text"> {{item}} </text>
      </div>
    </cell>
  </list>
</template>

<script>
export default {
  data() {
    return {
      lists: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  methods: {
    fetch () {
      setTimeout(()=> {
        this.lists.push(this.lists.length+1)
      }, 700);
    }
  }
};
</script>

<style scoped>
.panel {
  width: 600px;
  height: 250px;
  margin-left: 75px;
  margin-top: 35px;
  margin-bottom: 35px;
  justify-content: center;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(162, 217, 192);
  background-color: rgba(162, 217, 192, 0.2);
}
.text {
  font-size: 50px;
  text-align: center;
  color: #41b883;
}
</style>
