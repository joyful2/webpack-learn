
// import 'babel-polyfill'

// todo 为什么 我走 npm run startMyDevServer 执行的代码，没有走本文件？

import './test.ts'
// import test from './test.css'
// import test2 from'./test2.css'
import test from './test.less'
import test2 from'./test2.less'
import './test-my-loader.wy'
import 'jquery'
import './moduleA.js'
import './moduleB.js'
import {a} from './moduleA.js' // tree-shaking写法。 tree-shaking原理：监听 export流，将没用到的属性/方法去掉（若不是用export而是用的 module.exports 就无效，或 若import *引入了了全部，则也无效。） 注意：babel可能会编译export，导致tree-shaking无效，因此需留意babel配置，进行修改
a()

// 异步加载：异步加载的文件会单独打包为一个文件
// import写法
// 通过 webpackChunksName 指定打包后的文件名
import(/* webpackChunksName:'ma' */'./moduleA.js').then(function(res){

})
// require写法
// moduleB依赖于 moduleA时，这么写：
// require.ensure(['./moduleA'],function(){
//   var mb = require('./moduleB.js')
// })

import image from './assets/img/b.jpg'

document.querySelector('#div1').setAttribute('class',test2.div1)

const img = new Image()
img.src=image
document.querySelector('#div2').appendChild(img)

setTimeout(()=>{
  console.log('1000:',);
  },1000
)

async function asd(){}
asd()
// alert('11  22')
new Promise(()=>{

})
console.log('process.env.NODE_ENV:',process.env.NODE_ENV);
let i = 0;
// console.log('wtf.a:',wtf.a);
setInterval(()=>{
  i++
  document.querySelector('#div1').innerHTML = i+'?'
},1000) 

// hot:'only' 配置情况下,必须要如下代码，才能支持js的热更新，而且是 只热更新，不liveReload.    
if(module.hot){
  module.hot.accept()
}
