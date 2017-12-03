const webpackMerge = require('webpack-merge')
const base = require('./base')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const extractCSS = new ExtractTextPlugin('assets/css/[name]-one.css')
const extractStylus = new ExtractTextPlugin('assets/css/[name]-two.css')

module.exports = webpackMerge(base, {
  output: {
    filename: 'bundle.[chunkhash].js',
    path: process.cwd() + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                minimize: true
              }
            }
          ]
        })
      },
      {
        test: /\.styl$/i,
        use: extractStylus.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'stylus-loader',
              options: {
                minimize: true
              }
            }
          ]
        })
      },
    ]
  },
  plugins: [
    extractCSS,
    extractStylus,
    new UglifyJSPlugin({
      // 额外的压缩选项
      compress: {
        warnings: false,
        drop_console: true,
        pure_funcs: ['console.log']
      },
      // 额外的输出选项 （默认值为最佳压缩优化）
      output: {
        comments: false
      }
    }),
    new CleanWebpackPlugin(['dist'], {
      root: process.cwd(),
      exclude: []
    })
  ]
})