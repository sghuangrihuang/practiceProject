const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('../config')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 入口文件
  entry: resolve('src/index.js'),
  // 出口配置
  output: {
    // 出口路径目录
    path: config.build.assetsRoot,
    // 文件夹名字
    filename: '[name].js',
  },
  // 模块
  module: {
    // 模块规则（配置 loader、解析器等选项）
    rules: [
      {
        //  解析后缀为.gif,png,jpeg,svg的文件
        test: /\.(gif|png|jpe?g|svg)$/,
        // 使用指定loader加载
        use: [{
          loader: 'url-loader',
          // loader配置项
          options: {
            // 设置baseURL的分界值为1024 * 8字节也就是8KB，
            // 大于8KB则使用file-loader进行图片的生成以及存储，否则是base64
            limit: 1024 * 8,
            // 输出路径
            outputPath: 'static/images/',
            // 图片文件名
            name: '[hash:8].[name].[ext]'
          }
        }, {
          // 图片压缩
          loader: 'image-webpack-loader',
          options: {
            // 压缩JPEG配置 
            mozjpeg: {
              progressive: true,
              // 压缩图片品质
              quality: 65
            },
            // 压缩PNG配置
            optipng: {
              // 禁用
              enabled: false,
            },
            // 压缩PNG配置
            pngquant: {
              // 压缩图片品质
              quality: '65-90',
              // 转换速度
              speed: 4
            },
            // 压缩gif配置
            gifsicle: {
              // 不逐行扫描gif图片
              interlaced: false,
            },
            // PNG & JPEG 转webp配置
            webp: {
              // 压缩图片品质
              quality: 75
            }
          }
        }]
      }
    ]
  },
  plugins: [
    // html生成模板配置
    new htmlWebpackPlugin({
      // html指定模板
      template: 'index.html',
      // 添加hash值保证数据同步加载
      hash: true
    }),
  ]

}