// var extractTextCss = require('extract-text-webpack-plugin')

// const webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin')
// console.log('webpack.HotModuleReplacementPlugin:',webpack.HotModuleReplacementPlugin);
 
let postPlugins = ['autoprefixer']
module.exports = {
  mode: 'development',
  entry:{
    app:"./app.js",
  },
  output:{
    filename:'boundle.js'
  },
  // devtool:'cheap-module-source-map',
  devtool:'eval',
  devServer:{
    port:9001,
    historyApiFallback:{
      rewrites: [
        {
          // 当路由匹配到from的正则时，会自动跳到to方法return的路由去
          from:/^\/([ -~]+)/,
          to:function(ctx){
            // console.log('ctx:',ctx);
            console.log('ctx.match[1]:',ctx.match[1]);
            // todo 为什么这里重定向逻辑无效？ 
            return './' + ctx.match[1]+ '.html'
          }
        }
      ]
    },
    // inline:false,
    // overlay:true

    
    // 1 热更新只对css和js有效，html文件的改动无效 2 默认是liveReload
    // hot:true,
    hot:'only',// 不liveReload ,不刷新页面,保留状态
    // liveReload: false,
    proxy:{
      '/category':{
        // 对于 包含 '/category' 的请求路径， 都给转发到 https://study.163.com  的域名去 , 然后把实际的请求url拼接在该指定target的后面
        target:'https://study.163.com',
        changeOrigin:true, // 跨域
        pathRewrite: { '^/category/480000004222002': '' }, // 把最终路径中 key路径匹配到的 部分 都替换为 value部分
      }
    }
  },
  module:{
    rules: [
      {
        test:/\.js$/,
        exclude: /(node_modules|bower_components)/,
        use:{
          loader:'babel-loader',
          // options:{
          //   cacheDirectory:false,
          //   plugins: ['@babel/plugin-transform-runtime'],
          //   presets:[
          //     ['@babel/preset-env',{
          //       targets:{
          //         browsers:['>0.000000001%']
          //       }
          //     }]
          //   ]
          // }
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
                plugins: postPlugins
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
      },
      {
        // 自定义loader
        test:/\.wy$/,
        use:'./my-loader'
      }
      
    ]
  },
  plugins:[
  new htmlWebpackPlugin({
    filename:'index.html', //打包后的文件名
    template:'./index.html', //打包html所基于的模板
    minify:{
      // 压缩的在其内部是基于第三方工具实现的
      collapseWhiteSpace:true
    },
    inject:true, //打包后的css，js是否自动引入
  })
  ],
}
