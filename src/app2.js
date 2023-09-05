
// import 'babel-polyfill'

import './test.ts'
// import test from './test.css'
// import test2 from'./test2.css'
import test from './test.less'
import test2 from'./test2.less'
document.querySelector('#div1').setAttribute('class',test2.div1)

setTimeout(()=>{
  console.log('1000:',);
  },1000
)

async function a(){}

new Promise(()=>{

})

console.log('process.env.NODE_ENV:',process.env.NODE_ENV);

