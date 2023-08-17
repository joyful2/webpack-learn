require('babel-loader')
// var extractTextCss = require('extract-text-webpack-plugin')
module.exports = {

  entry:{
    app:"./app.js"
    // appName:['./app.js','babel-polyfill']
  },
  // entry:['app.js','babel-polyfill'],
  output:{
    // path:
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
      },
      {
        // test:/\.css$/,
        test:/\.less$/,
        use:[
          {
            loader:'style-loader',
            // options:{
            //   insertInto:'#mydiv',
            //   singleton:true,
            //   transform:'./transform.js'
            // }
          },
          {
            loader:'css-loader',
            options:{
              // modules:true  // todo 了解css modules
              modules:{
                localIdentName:'[path][name]_[local]_[hash:4]' // 注意webpack 3 版本的写法是放modules 外面的
              }
            }
          },
          {
            loader:'postcss-loader',
            options:{
              // ident:'postcss',
               postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    // 'postcss-cssnext'
                    // {
                    //   // 选项
                    // },
                  ],
                ],
              },
              // plugins:[
              //   require('autoprefixer')(
              //     {
              //     'overrideBrowserslist':[
              //       ">1%",'last 2 versions'
              //     ]
              //   }
              //   )
              // ]
            }
          },
          {
            loader:'less-loader'
          }
        ]
      }
      // {
      //   test:/\.less$/,
      //   use:extractTextCss.extract({
      //     fallback:{
      //       loader:'style-loader',
      //       // options:{
      //       //   // insertInto:'#mydiv',
      //       //   singleton:true,
      //       //   transform:'./transform.js'
      //       // }
      //     },
      //     use:[
      //       {
      //       loader:'css-loader',
      //       options:{
      //         // modules:true  // todo 了解css modules
      //         modules:{
      //           localIdentName:'[path][name]_[local]_[hash:4]' // 注意webpack 3 版本的写法是放modules 外面的
      //         }
      //       }
      //     },
         
      //     {
      //       loader:'less-loader'
      //     }
      //     ]
      //   })
      //   // use: extractTextCss.extract({
      //   //   fallback: "style-loader",
      //   //   use: "css-loader"
      //   // })
      // }
      
    ]
  },
  plugins:[
    // new extractTextCss("styles.css")
    // new extractTextCss({
    //   filename:'[name].min.css'
    // })
  ]
}