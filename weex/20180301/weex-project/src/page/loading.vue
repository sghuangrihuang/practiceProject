<template>
  <list class="list" loadmoreoffset="10">
    <header>list组件的header组件</header>
    <cell class="cell" v-for="(item, index) in lists" :key="index">
      <div class="panel">
        <text class="text"> {{item}} </text>
      </div>
    </cell>
    <loading @loading="fetch" class="loading" :display="loading ? 'show': 'hide' ">
      <text class="loading-text">loading....</text>
      <loading-indicator class="indicator"></loading-indicator>
    </loading>
  </list>
</template>

<script>
export default {
  data() {
    return {
      loading: false, //用loading变量存储loading组件的状态 true为显示 false 为隐藏
      lists: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  methods: {
    fetch () {
      this.loading= true;
      setTimeout(()=> {
        this.loading= false;
        this.lists.push(this.lists.length+1)
      }, 700);
    }
  }
};
</script>

<style scoped>
.loading {
  width: 750px;
  align-items: center;
  display: flex;
  justify-content: center;
}
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
.indicator {
  width: 40px;
  height: 40px;
  font-size: 40px;
  margin-top: 40px;
}
</style>
