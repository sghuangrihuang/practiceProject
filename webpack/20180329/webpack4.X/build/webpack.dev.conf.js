const webpackMerge = require('webpack-merge')
const base = require('./webpack.base.conf')

const webpack = require('webpack')

module.exports = webpackMerge(base, {

  mode: 'development',
  
  output: {
    filename: '[name].bundle.js'
  },
  devServer: {
    // contentBase: process.cwd() + '/dist',
    inline: true,
    hot: true,
    port: 8080,
    compress: true,
    overlay: {
      errors: true,
      warnings: true
    }
  },
  devtool: 'eval-source-map',
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
