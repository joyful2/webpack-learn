
// 自定义loader
module.exports = (source)=>{
  let str = source.replace('c','console.log')
  // this.callback(err,str,sourcemap)  this.callback内置方法， 可把错误信息等传出去
  return str
}