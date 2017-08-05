#   webpack注意事项

##  自定义路径别名问题

可能有些人注意到了，在 vue-cli 生成的模板中在导入组件时使用了这样的语法：

``` javascript
  import Index from '@/components/Index'
```

　这个 @ 是什么东西？后来改配置文件的时候发现这个是 webpack 的配置选项之一：路径别名。

　我们也可以在基础配置文件中添加自己的路径别名，比如下面这个就把 ~ 设置为路径 src/components 的别名：

``` javascript
  // build/webpack.base.js
  resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '~': resolve('src/components')
    }
  }

  // 引用
  import YourComponent from '~/YourComponent'
```

##  vue-cli 项目路径配置
  
由于 vue-cli 配置的项目提供了一个内置的静态服务器，在开发阶段基本不会有什么问题。但是，当我们把代码放到服务器上时，经常会遇到静态资源引用错误，导致界面一片空白的问题。

这是由于 vue-cli 默认配置的 webpack 是以站点根目录引用的文件，然而有时候我们可能需要把项目部署到子目录中。

可以通过修改文件引用的相对路径

``` javascript
  // 其中 assetsSubDirectory 指静态资源文件夹，也就是打包后的　js、css、图片等文件所放置的文件夹，这个默认一般不会有问题。
  build.assetsSubDirectory: 'static'
  // assetsPublicPath 指静态资源的引用路径，默认配置为 /，即网站根目录，与 assetsSubDirectory 组合起来就是完整的静态资源引用路径 /static
  build.assetsPublicPath: '/'

  // 所以 修改文件  把根目录改为相对目录
  build.assetsPublicPath: './'
  
```

## Vue-cli proxyTable 解决开发环境的跨域问题
---
我们在开发阶段，通常都是在本地调试，本地起的服务域名通常是 localhost:端口号。这样会产生一些接口的跨域问题，除了常规的一些跨域方案，我们实际上可以借助 node.js 服务帮我们代理这些接口。

我们借助 vue-cli 脚手架帮我们生成一些初始化代码。在 config/index.js 文件中，我们修改 dev 下 proxyTable 的配置。

有关于API proxy的说明[详细看](https://vuejs-templates.github.io/webpack/proxy.html)

这个参数主要是一个地址映射表，你可以通过设置将复杂的url简化，例如我们要请求的地址是`http://xxx.com.cn/api/1`，可以按照如下设置：
``` javascript
   proxyTable: {
    '/api': {
      target: 'http://xxx.com.cn', //你的目标域名
      changeOrigin: true, // 为true, 那么本地会虚拟一个服务端接收你的请求并代你发送该请求，这样就不会有跨域问题了，当然这只适用于开发环境
      pathRewrite: {
        '^/api': ''
      }
    }
}
```
这样我们在写url的时候，只用写成/api/1就可以代表`http://xxx.com.cn/api/1`

vue-cli的这个设置来自于其使用的插件http-proxy-middleware
github：[https://github.com/chimurai/http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)
