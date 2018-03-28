const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

//  npm install -D extract-text-webpack-plugin@next
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    hot: true,
    port: 8090,
    open: true
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
              minimize: true //css压缩
            }
          }]
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            outputPath: 'asset/images/',
            name: '[hash:8].[name].[ext]'
          }
        }, {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75
            }
          }
        }]
      }
    ]
  },
  plugins: [
    new cleanWebpackPlugin(['dist']),
    new uglifyjsWebpackPlugin(),
    new extractTextWebpackPlugin("asset/css/style.css"),
    new htmlWebpackPlugin({
      template: './src/index.html',
      hash: true
    }),
    // 会显示模块的相对路径
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

