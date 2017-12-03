const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'developer';
const isPro = nodeEnv === 'production';

module.exports = {
  entry: './src/index.js',
  
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    compress: true,
    port: 8080,
    hot: true,
    inline: true,
    overlay: {
      errors: true,
      warnings: true
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // {
      //   test: /\.js$/,
      //   // 可以不用定义这个字段的属性值，eslint会自动忽略node_modules和bower_components
      //   exclude: /(node_modules|bower_components)/, //排除去这些文件夹进行eslint检查
      //   include: /src/,// 针对性对./src/文件夹下所有的js文件进行eslint检查
      //   enforce: 'pre', // 在babel-loader对源码进行编译前进行lint的检查
      //   use: [{
      //     loader: 'eslint-loader',
      //     options: {rules: {semi: 0}}
      //   }]
      // }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(isPro)
    }),
    // set NODE_ENV=production && webpack
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'webpack demo',
      hash: true
    })
  ]
}