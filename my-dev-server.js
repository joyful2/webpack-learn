// 自己实现的webpack-dev-server
const express = require('express')
const webpackDevMid = require('webpack-dev-middleware') // 把打包代码传输到开启的服务里的  详细配置可查看npm
const webpackHotMid = require('webpack-hot-middleware') // 热更新中间件
const webpack = require('webpack')
// const config = require('./webpack.dev.config.js')
const config = require('./webpack.myConfig.js')
console.log('config:',config);
// const config = require('./webpack.config.js')

// todo 为何热更新无效？？
Object.keys(config.entry).forEach((name)=>{
  // config.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(config.entry[name])
  config.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true',config.entry[name]]
})
const compiler = webpack(config)
// console.log('config:',config);

const app = express()
app.use(webpackDevMid(compiler,{}))
app.use(webpackHotMid(compiler,{
  overlayStyles:true
}))

app.listen(2007)
