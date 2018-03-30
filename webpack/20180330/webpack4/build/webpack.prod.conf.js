const webpackMerge = require('webpack-merge')
const base = require('./webpack.base.conf')
const path = require('path')
const config = require('../config')

const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = webpackMerge(base, {

  mode: 'production',
  
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: path.posix.join(config.build.assetsSubDirectory, 'js/[name].[chunkhash].js'),
    chunkFilename: path.posix.join(config.build.assetsSubDirectory, 'js/[id].[chunkhash].js')
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }]
        })
      },
    ]
  },

  plugins: [
    new cleanWebpackPlugin([config.build.assetsRoot], {
      root: path.resolve(__dirname, '..')
    }),
    new extractTextWebpackPlugin({
      filename: path.posix.join(config.build.assetsSubDirectory, 'css/[name].[contenthash].css'),
      allChunks: true
    }),
    new uglifyjsWebpackPlugin({ 
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    })
  ]

})
