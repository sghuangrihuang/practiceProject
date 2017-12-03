const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


// const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
// const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');

const nodeEnv = process.env.NODE_ENV || 'developer';
const isPro = nodeEnv === 'production';

module.exports = {
  entry: './src/index.js',
  
  output: {
    filename: '[name].[hash:8].bundle.js',
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
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      // {
      //   test: /\.css$/,
      //   use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
      // },
      // {
      //   test: /\.less$/i,
      //   use: extractLESS.extract([ 'css-loader', 'less-loader' ])
      // },
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
    // new ExtractTextPlugin({object})
    // filename {String|Function}  生成文件的文件名。可能包含 [name], [id] and [contenthash]
    // allChunks {Boolean} 从所有额外的 chunk(additional chunk) 提取（默认情况下，它仅从初始chunk(initial chunk) 中提取）
    // 当使用 CommonsChunkPlugin 并且在公共 chunk 中有提取的 chunk（来自ExtractTextPlugin.extract）时，allChunks **必须设置为 true
    new ExtractTextPlugin("css/[name].css"),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'webpack demo',
      hash: true
    })
  ]
}