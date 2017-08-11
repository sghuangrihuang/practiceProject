const webpackMerge = require('webpack-merge')
const base = require('./base')
const path = require('path')
const webpack = require('webpack')


module.exports = webpackMerge(base, {
  output: {
    filename: '[name].bundle.js'
  },
  devtool: 'eval-source-map',
  devServer: {
    inline:true,
    hot:true,
    port: 8080,
    compress: true,
    overlay: {
      errors: true,
      warnings: true
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})