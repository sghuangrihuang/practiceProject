# vue 问题解决方案

## 最新vue-cli 2.9.1的webpack存在问题

> 最近vue-cli更新，用其构建项目的时候，发现bulid文件下少了两个文件，分别是dev-sever.js和dev-client.js

** vue-cli 2.8  **

![](https://sghuangrihuang.github.io/staticRepository/11-18/images/1.png)  

**vue-cli 2.9.1  ** 

![](https://sghuangrihuang.github.io/staticRepository/11-18/images/2.png) 

这是为什么呢  
我们查看下package.json   
vue-cli 2.8  
![](https://sghuangrihuang.github.io/staticRepository/11-18/images/3.png)  

vue-cli 2.9.1  
![](https://sghuangrihuang.github.io/staticRepository/11-18/images/4.png)  

由此可知 在最新版本的vue-cli中webpack版本更新到v3.6.0了。   

既然更新了 那就我们就重新开下webpack的配置项。

### vue自启浏览器设置

当我们启动npm run dev执行此cli的时候发现 居然不会自己启动浏览器了  

这样的话 岂不是装逼不了？ 不不不 还是可以的，只要我们修改下配置项就可以了  

我们先看看 我们npm run dev 到底执行了什么
继续查看package.json的scripts选项的dev 配置  

**vue-cli 2.9.1  **  package.json  
![](https://sghuangrihuang.github.io/staticRepository/11-18/images/5.png)  

对比下就知道 当我们运行npm run dev 实际上是执行了webpack-dev-server --inline --progress --config build/webpack.dev.conf.js  
**vue-cli 2.8  **   package.json  
![](https://sghuangrihuang.github.io/staticRepository/11-18/images/6.png)  

跟之前运行npm run dev 有区别 也好说明了他要删除这两个文件的原因了，因为最新版本的webpack的配置中是采用webpack-dev-server这个插件进行的启动浏览器的 可以在官网进行查看他的一个[API](https://doc.webpack-china.org/configuration/dev-server/)使用说明

build/webpack.dev.conf.js  运行路径 那查看下其配置

vue-cli 2.9.1 build/webpack.dev.conf.js    
![](https://sghuangrihuang.github.io/staticRepository/11-18/images/7.png)  

查看API就知道这个open 这个参数就是打开自启服务器的原因，但是config.dev.autoOpenBrowser这个是什么呢，我们可以向上查找  
![](https://sghuangrihuang.github.io/staticRepository/11-18/images/8.png)  

刚好对应config的定义 require就是加载进来 那就是继续查看对应的路径 刚好对应config文件下的index.js 在require默认是其下的index文件 这里就对应index.js  


config/index.js  
![](https://sghuangrihuang.github.io/staticRepository/11-18/images/9.png)  

这里的autoOpenBrowser对应false ,既然我们要改动那就直接改为true就可以。然后在重启下服务 就可以自启动服务了 

其中的port也可以改对应的启动端口，在最新版本的vue-cli配置中 即使设置的端口被占用了，他自动会在其端口在加1 开启服务的。 

-----

### 饿了吗APP 接口设置问题

由于bulid文件夹下的两个文件没有，那饿了吗接口怎么设置呢。  

在此之前我们理解下饿了吗app的接口的设置原理，由于数据都是直接从data.json这个文件获取的，所以呢，我们要模拟mock做个接口。但是在饿了吗APP的设置中 它是直接启动服务的时候把接口给做好了，这也是为什么我们可以直接访问其/api/seller有对应数据  
vue-cli 2.9.1 ![](https://sghuangrihuang.github.io/staticRepository/11-18/images/10.png)  

在vue-cli 2.9.1之前版本是在dev-server.js直接设置的 具体参数在  
**vue-cli 2.8  **  
![](https://sghuangrihuang.github.io/staticRepository/11-18/images/11.png)  


#### 方法一

回到起点，在最新版本vue-cli的配置中浏览器服务都在webpack-dev-server 这个插件中，那我们就其在webpack.dev.conf.js进行修改  
现在我们的要求就是怎么在服务开启的时候接口数据也对应做好呢，那我们查看其插件API 刚好有一个参数就是[devServer.before](https://doc.webpack-china.org/configuration/dev-server/#devserver-before)  
devServer.before  
![](https://sghuangrihuang.github.io/staticRepository/11-18/images/12.png)  

就是解决问题所在了。 进行修改  
webpack.dev.conf.js
![](https://sghuangrihuang.github.io/staticRepository/11-18/images/13.png)  

这样我们就可以直接发送API请求数据了
``` javascript
this.axios.get("/api/seller").then(function(res){
  // do something
})
```

#### 方法二

会node的也可以直接做个api接口，开启node服务 然后饿了吗项目直接访问这个接口，当然这里会存在跨域问题和路由映射，不过webpack-dev-server 帮你们解决这个问题了 主要是设置参数问题 [devServer.proxy](https://doc.webpack-china.org/configuration/dev-server/#devserver-proxy) 进行路由映射等等  

![](https://sghuangrihuang.github.io/staticRepository/11-18/images/14.png)  

不过这些还需要考虑到自身能力，我建议还是使用第一种方法

## axios Post无法传递数据

最近在做vue项目的时候，采用axios，进行ajax网络请求，但是使用过程中出现post无法传递数据

``` javascript
getList () {
  let params = {
    name: 'admin',
    code: '123456'
  }
  axios.post(url, params).then((res) => {
    if (res.state == 200) {
      console.log()
    }
  })
}
```

通过查看发送信息以及传统jQuery的post请求来看，发现一细节

``` javascript
// axios 
// Content-Type：application/json;charset=UTF-8
// Request Payload: { name: 'admin', code: '123456'}

// jQ
// Content-Type：application/x-www-form-urlencoded;charset=UTF-8
// Request name=admin&code=123456
```

首先通过axios全局 把post请求头设置为`application/x-www-form-urlencoded`

``` javascript
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
```

通过[axios](https://github.com/axios/axios#using-applicationx-www-form-urlencoded-format)官方提供信息推荐我们使用其下两个方式进行处理post请求数据

1、 URLSearchParams
``` javascript
// 此方法，存在浏览器兼容情况
var params = new URLSearchParams();
params.append('name', 'admin');
params.append('code', '123456');
axios.post(url, params);
```

2、qs库

``` javascript
// 建议使用qs库
var qs = require('qs');
axios.post(url, qs.stringify({ 'name': 'admin' }));
```


在axios使用Post发送数据时，默认是直接把json放到请求体中提交到后端的。针对后端而言，获取数据的方式有两种
  1. `@RequestParam` (通过字符串中解析出参数，很明显后端默认使用这种请求获取数据)
  2. `@ResponseBody` (从请求体中取参数)

### 总结
针对axios Post无法传递数据，解决方案就是：先设置post请求头为标准的`application/x-www-form-urlencoded`, 其次针对请求数据采用qs库进行格式化

## Vue-cli proxyTable 解决开发环境的跨域问题

开发阶段，通常都是在本地调试，本地起的服务域名通常是 localhost:端口号。这样会产生一些接口的跨域问题，除了常规的一些跨域方案，我们实际上可以借助 node.js 服务帮我们代理这些接口。

我们借助 vue-cli 脚手架帮我们生成一些初始化代码。在 config/index.js 文件中，我们修改 dev 下 proxyTable 的配置。

有关于API proxy的说明[详细看](https://vuejs-templates.github.io/webpack/proxy.html)

这个参数主要是一个地址映射表，你可以通过设置将复杂的url简化，例如我们要请求的地址是`http://xxx.com.cn/api/1`，可以按照如下设置：
``` javascript
  ...
  proxyTable: {
    '/api': {
      target: 'http://xxx.com.cn', //你的目标域名
      changeOrigin: true, // 为true, 那么本地会虚拟一个服务端接收你的请求并代你发送该请求，这样就不会有跨域问题了，当然这只适用于开发环境
      pathRewrite: {
        '^/api': ''
      }
    }
  }
  ...
```
这样我们在写url的时候，只用写成/api/1就可以代表`http://xxx.com.cn/api/1`

vue-cli的这个设置来自于其使用的插件http-proxy-middleware
github：[https://github.com/chimurai/http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)

##  vue-cli 项目打包路径配置
  
由于 vue-cli 配置的项目提供了一个内置的静态服务器，在开发阶段基本不会有什么问题。但是，当我们把代码放到服务器上时，经常会遇到静态资源引用错误，导致界面一片空白的问题。

这是由于 vue-cli 默认配置的 webpack 是以站点根目录引用的文件，然而有时候我们可能需要把项目部署到子目录中。

可以通过修改配置文件引用的相对路径

``` javascript
  // 其中 assetsSubDirectory 指静态资源文件夹，也就是打包后的　js、css、图片等文件所放置的文件夹，这个默认一般不会有问题。
  build.assetsSubDirectory: 'static'
  // assetsPublicPath 指静态资源的引用路径，默认配置为 /，即网站根目录，与 assetsSubDirectory 组合起来就是完整的静态资源引用路径 /static
  build.assetsPublicPath: '/'

  // 所以 修改文件  把根目录改为相对目录
  build.assetsPublicPath: './'
  
```