require('babel-loader')
var htmlWebpackPlugin = require('html-webpack-plugin')
// var extractTextCss = require('extract-text-webpack-plugin')
module.exports = {
  mode: 'production',
  entry:{
    app:"./src/app.js",
    // app:"./src/app.js",
    // app2:"./src/app2.js",
    // appName:['./src/app.js','babel-polyfill']
  },

  devServer:{
    port:9003
  },
  // entry:['app.js','babel-polyfill'],
  output:{
    // path:
    // filename:'[name].[hash:8].js'
    filename:'[name].boundle.js'
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
              // modules:true
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
      //         // modules:true
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
    new htmlWebpackPlugin({
      filename:'index.html', //打包后的文件名
      template:'./src/index.html', //打包html所基于的模板
      minify:{
        // 压缩的在其内部是基于第三方工具实现的
        collapseWhiteSpace:true // todo 没生效！
      },
      inject:false, //打包后的css，js是否自动引入  todo 没生效
      // chunks:['app'] // 多入口时，用于指定哪个入口打包出的文件 // todo 有未配置的情况也只引入了一个的问题
      // todo 问题：如上3个todo + 引入路径问题
    })
  ]
}