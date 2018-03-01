<template>
  <div>
    <text class="text" @click="urlGet">请求get</text>
    <text class="text" @click="urlPost">请求Post</text>
    <text class="text" @click="urlJSONP">请求Jsonp</text>
  </div>
</template>

<script>
const stream = weex.requireModule('stream');
const GET_URL = 'http://httpbin.org/get'
const POST_URL = 'http://httpbin.org/post'
const GET_URL_JSONP = "http://jsfiddle.net/echo/jsonp/?callback=anything&result=content_in_response"

export default {
  methods: {
    urlGet() {
      stream.fetch({
        method: 'GET',
        url: GET_URL,
        type: 'json'
      }, (res)=> {
        console.log(res);
      }, (response)=> {
        console.log(response);
      })
    },
    urlPost() {
      stream.fetch({
        method: 'POST',
        url: POST_URL,
        type: 'json'
      }, (res)=> {
        console.log(res);
      }, (response)=> {
        console.log(response);
      })
    },
    urlJSONP() {
      stream.fetch({
        method: 'GET',
        url: GET_URL_JSONP,
        type: 'jsonp'
      }, (res)=> {
        console.log(res);
      }, (response)=> {
        console.log(response);
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
