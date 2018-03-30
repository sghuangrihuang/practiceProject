const webpackMerge = require('webpack-merge')
const base = require('./webpack.base.conf')
const config = require('../config')

const webpack = require('webpack')

module.exports = webpackMerge(base, {

  mode: 'development',
  
  output: {
    filename: '[name].bundle.js'
  },

  devServer: {
    clientLogLevel: 'warning',
    contentBase: false,
    hot: true,
    host: '127.0.0.1' || config.dev.host,
    port: '8080' || config.dev.port,
    open: config.dev.autoOpenBrowser,
    compress: true,
    overlay: config.dev.errorOverlay
      ? { errors: true, warnings: true} 
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },

  devtool: config.dev.devtool,
  
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]

})
