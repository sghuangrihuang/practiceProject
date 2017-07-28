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

##  项目路径配置
  
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

