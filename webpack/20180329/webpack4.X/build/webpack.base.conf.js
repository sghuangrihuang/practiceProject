const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {

  entry: resolve('src/index.js'),

  module: {
    rules: [
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
    new htmlWebpackPlugin({
      template: resolve('src/index.html'),
      hash: true
    }),
  ]

}