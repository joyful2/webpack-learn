// webpack.development.config.js


require('babel-loader')

module.exports = {
  mode: 'development',
  entry:{
    app:"./app.js"
    // appName:['./app.js','babel-polyfill']
  },
  // entry:['app.js','babel-polyfill'],
  output:{
    path:__dirname+'/dist',
    // filename:'[name].[hash:8].js'
    filename:'boundle.js'
  },
  module:{
    rules: [
      {
        test:/\.js$/,
        // test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        // use:'babel-loader'
        use:{
          loader:'babel-loader',
          options:{
            // presets: ['@babel/preset-env'],
            // plugins: ['@babel/plugin-proposal-object-rest-spread'],
            cacheDirectory:false,
            plugins: ['@babel/plugin-transform-runtime'],
            presets:[
              ['@babel/preset-env',{
                targets:{
                  browsers:['>0.000000001%'],
                  // node:'10',
                  // chrome:'59'
                }
              }]
            ]
          }
        }
      },
      {
        test:/\.tsx?$/,
        use:'ts-loader'
      }
    ]
  }
}