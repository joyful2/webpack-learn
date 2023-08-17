// webpack.production.config.js

module.exports = {
    mode: 'production',
  entry:{
    app:"./app.js"
  },
  output:{
    // path:
    filename:'boundle.js'
  },
  module:{
    rules: [
      {
      test:/\.js$/,
      // use:'babel-loader'
      use:{
        loader:'babel-loader',
        options:{
          presets:[
            ['@babel/preset-env',{
              targets:{
                browsers:['>0.000000000001%'],
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