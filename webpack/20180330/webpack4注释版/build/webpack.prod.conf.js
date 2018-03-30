const webpackMerge = require('webpack-merge')
const base = require('./webpack.base.conf')
const path = require('path')
const config = require('../config')

// webpack4.X 必须安装4.0.0版本以上的extract-text-webpack-plugin @next
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

// 使用webpackMerge进行数据的合并
module.exports = webpackMerge(base, {
  // 设置当前环境为生成环境
  mode: 'production',
  // 出口配置
  output: {
    // 生成静态资源的根目录
    path: config.build.assetsRoot,
    // 生成静态资源的公开路径
    publicPath: config.build.assetsPublicPath,
    // 文件名字
    filename: path.posix.join(config.build.assetsSubDirectory, 'js/[name].[chunkhash].js'),
    // chunk文件名字
    chunkFilename: path.posix.join(config.build.assetsSubDirectory, 'js/[id].[chunkhash].js')
  },
  // 开发工具 source map
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  // 模块配置
  module: {
    // 模块规则（配置 loader、解析器等选项）
    rules: [
      {
        // 解析后缀为.css的文件
        test: /\.css$/,
        use: extractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: 'css-loader',
            // loader配置项
            options: {
              // 进行css压缩
              minimize: true
            }
          }]
        })
      },
    ]
  },

  plugins: [
    // 清空构建文件夹
    new cleanWebpackPlugin([config.build.assetsRoot], {
      // 设置跟路径为当前文件的上一级
      root: path.resolve(__dirname, '..')
    }),
    // 生成.css文件配置
    new extractTextWebpackPlugin({
      // css文件名
      filename: path.posix.join(config.build.assetsSubDirectory, 'css/[name].[contenthash].css'),
      // 添加Chunks
      allChunks: true
    }),
    new uglifyjsWebpackPlugin({ 
      // uglify 选项
      uglifyOptions: {
        // 	添加额外的压缩选项
        compress: {
          // 去除警告信息
          warnings: false
        }
      },
      // 开发工具
      sourceMap: config.build.productionSourceMap,
      // 使用多进程并行运行和文件缓存来提高构建速度
      parallel: true
    })
  ]

})
