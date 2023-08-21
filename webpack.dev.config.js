
// 开发配置： 热更新，eslint,source-map ...

const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool:'cheap-module-source-map',
  devServer:{
    // todo 为什么本地服务跑起来，访问到的页面是 cannot GET?
    // port:9001,
    // // overlay:true,
    // hot:true,
    // hotOnly:true,
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
  ]

}