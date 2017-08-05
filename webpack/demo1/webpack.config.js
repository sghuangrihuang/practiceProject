var path = require('path')

module.exports = {
  // 入口文件
  entry: './src/index.js',
  //  webpack 开始打包

  // 出口文件
  output: {
    //  webpack 如何输出结果的相关选项

    filename: 'bundle.js',
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）

    path: path.resolve(__dirname, 'dist')
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）

  },
  module: {
    // 关于模块配置
    rules: [
      // 模块规则（配置 loader、解析器等选项）
      {
        // 解析后缀为.css的文件
        test: /\.css$/,
        // loader追加
        // 等价于
        // use: [ { loader: "style-loader" }, { loader : "css-loader" } ],
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}