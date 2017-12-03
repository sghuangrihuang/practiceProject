const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    // compress是否启用gzip 压缩
    compress: true,
    // port指定要监听请求的端口号
    port: 8080,
    // 告诉服务器从哪里提供内容 不添加话 devServer默认根目录是在webpack.config同一级的目录下
    // index.html（必须保存index.html文件存在 不然报错）
    // contentBase: './dist',
    // hot是否开启热更新
    hot: true,
    // inline开启应用程序启用内联模式(inline mode)。
    // 这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台。
    inline: true,
    
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // CleanWebpackPlugin(paths [, {options}])
    // paths 一个数组，数组的每一个元素为要删除的路径
    // options {
    //一个根的绝对路径 对应webpackconfig绝对路径 __dirname
    //  "root": __dirname,
    // 是否开启在控制台输出信息
    //  "verbose": true,
    // 默认为false，删除所有的文件， 为true时，模拟删除，并不删除文件
    //  "dry": false,
    // 默认false， 为true时删除所有的编译文件
    //  "watch": false
    // }
    new CleanWebpackPlugin(['dist']),
    // 热更新webpack扩展插件 devServer.hot设置为true 就添加
    new webpack.HotModuleReplacementPlugin(),
    // HtmlWebpackPlugin 创建html文件
    new HtmlWebpackPlugin({
      title: 'webpack demo',
      hash: true
    })
  ]
}