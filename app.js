
// import 'babel-polyfill'

// todo 为什么 我走 npm run startMyDevServer 执行的代码，没有走本文件？

import './test.ts'
// import test from './test.css'
// import test2 from'./test2.css'
import test from './test.less'
import test2 from'./test2.less'
import './test-my-loader.wy'
document.querySelector('#div1').setAttribute('class',test2.div1)

setTimeout(()=>{
  console.log('1000:',);
  },1000
)

async function a(){}
alert('11  22')
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
