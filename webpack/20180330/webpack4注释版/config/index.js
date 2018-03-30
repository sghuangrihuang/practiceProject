const path = require('path')

module.exports = {

  // 开发配置项
  dev: {
    // 静态资源的根目录的子目录static
    assetsSubDirectory: 'static',
    // 静态资源的公开路径
    assetsPublicPath: '/',
    // proxy代理
    proxyTable: {},
    // 主机名
    host: 'localhost',
    // 端口号
    port: 8080,
    // 是否自启浏览器
    autoOpenBrowser: true,
    // 是否全屏显示报错警告信息
    errorOverlay: true,
    // 是否开启webpack 监听模式，文件变化，当它们修改后会重新编译
    poll: false,
    // 开发工具 source map
    devtool: 'cheap-module-eval-source-map'

  },

  // 生产配置项
  build: {
    // 相对路径的拼接，假如当前跟目录是config，
    // 那么下面配置的index属性的属性值就是dist/index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    // 静态资源的根目录 也就是dist目录
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 静态资源根目录的子目录static，也就是dist目录下面的static
    assetsSubDirectory: 'static',
    // 静态资源的公开路径，也就是真正的引用路径
    assetsPublicPath: '/',
    // 是否生成生产环境的sourcmap，sourcmap是用来debug编译后文件的，通过映射到编译前文件来实现
    productionSourceMap: true,
    // 开发工具 source map
    devtool: '#source-map',
  }
}