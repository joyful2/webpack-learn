// 生产配置： 压缩，html打包（tree-shaking,）

const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: 'production', // webpack4 默认了很多配置，减少了配置文件书写。比如代码压缩，tree-shaking等
  optimization:{
    minimize:false
  }, 
  plugins:[
    new htmlWebpackPlugin({
      filename:'index.html', //打包后的文件名
      template:'./src/index.html', //打包html所基于的模板
      minify:{
        // 压缩的在其内部是基于第三方工具实现的
        collapseWhiteSpace:true
      },
      inject:true, //打包后的css，js是否自动引入
    })
  ]

}