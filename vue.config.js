/**
 * 配置该文件可以参考:
 * https://cli.vuejs.org/zh/config/#%E7%9B%AE%E6%A0%87%E6%B5%8F%E8%A7%88%E5%99%A8
 *
 */
const url = 'http://pig-gateway:9999'
// 基础路径，发布前修改这里,当前配置打包出来的资源都是相对路径
let publicPath = './'
module.exports = {
  publicPath: publicPath,
  lintOnSave: true,
  productionSourceMap: false,
  css: {
    // 忽略 CSS order 顺序警告
    extract: { ignoreOrder: true }
  },
  chainWebpack: config => {
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
  },
  // 配置转发代理
  devServer: {
    port: 8080,
    proxy: {
        '/api': {
        target: 'http://localhost:8100/',  //要解决跨域的接口的域名
        ws:true,
        secure:false,           //如果是https接口，需要配置这个参数
        changeOrigin: true,  // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/api': ''  // 路径重写
        }
      },
      '/': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/': '/'
        }
      }
    } // proxy
  }// devServer
}
