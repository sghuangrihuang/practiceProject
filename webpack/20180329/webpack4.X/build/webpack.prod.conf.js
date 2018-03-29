const webpackMerge = require('webpack-merge')
const base = require('./webpack.base.conf')

const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = webpackMerge(base, {

  mode: 'production',
  
  output: {
    filename: 'bundle.[chunkhash].js',
    path: process.cwd() + '/dist'
  },
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
    new cleanWebpackPlugin(['dist'], {
      root: process.cwd(),
      exclude: []
    }),
    new extractTextWebpackPlugin('asset/css/style.css'),
    new uglifyjsWebpackPlugin()
  ]

})
