const webpackMerge = require('webpack-merge')
const base = require('./webpack.base.conf')
const config = require('../config')
const webpack = require('webpack')

// 使用webpackMerge进行数据的合并
module.exports = webpackMerge(base, {
  // 设置当前环境为开发环境
  mode: 'development',
  // 出口配置
  output: {
    // 文件名字
    filename: '[name].bundle.js'
  },
  // devserver配置项
  devServer: {
    // 启动inline模式 控制台显示信息
    clientLogLevel: 'warning',
    // 告诉服务器从哪里提供内容
    contentBase: false,
    // 是否启动hot热更新
    hot: true,
    // 主机名
    host: '127.0.0.1' || config.dev.host,
    // 端口号
    port: '8080' || config.dev.port,
    // 是否自启浏览器
    open: config.dev.autoOpenBrowser,
    // 是否启动GZIP压缩
    compress: true,
    // 是否开启全屏显示报错警告信息
    overlay: config.dev.errorOverlay
      ? { errors: true, warnings: true} 
      : false,
    // 浏览器的公开路径
    publicPath: config.dev.assetsPublicPath,
    // 是否设置proxy代理
    proxy: config.dev.proxyTable,
    // 控制台中是否不输出打包的信息
    quiet: true, 
    // 是否开启webpack watch模式
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  // 开发工具 source map
  devtool: config.dev.devtool,
  // 模块配置
  module: {
    //  模块规则配置
    rules: [
      {
        // 解析后缀为.css的文件
        test: /\.css$/,
        // 使用loader解析
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // 开启webpack 热更新
    new webpack.HotModuleReplacementPlugin(),
    // 显示模块名字路径
    new webpack.NamedModulesPlugin()
  ]

})
