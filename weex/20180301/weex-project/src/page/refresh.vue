<template>
  <list class="list" loadmoreoffset="10">
    <refresh @refresh="fetch" class="refresh" :display="refresh? 'show': 'hide' ">
      <text class="loading-text">refresh....</text>
      <loading-indicator class="indicator"></loading-indicator>
    </refresh>
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
      refresh: false, //用refresh变量存储refresh组件的状态 true为显示 false 为隐藏
      lists: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  methods: {
    fetch () {
      this.refresh= true;
      setTimeout(()=> {
        this.refresh = false;
        this.lists.sort((a,b)=> {
          return b-a;
        })
      }, 700);
    }
  }
};
</script>

<style scoped>
.refresh {
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
