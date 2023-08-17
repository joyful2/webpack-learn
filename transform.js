module.exports = function(css){
  // css是字符串
  if(window.screen.width < 500){
    css = css.replace('red','yellow')
  }
  // 需要return出去
  return css
}