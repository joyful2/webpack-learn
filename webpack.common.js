var extractTextCss = require('extract-text-webpack-plugin')
const dev = require('./webpack.dev.config.js')
const pro = require('./webpack.pro.config.js')
const {merge} = require('webpack-merge')

// console.log('merge:',merge);

module.exports = (env)=>{
  console.log('env:',env,env.pro);
  let postPlugins = ['autoprefixer']
  postPlugins = postPlugins.concat( env.pro ? ['postcss-sprite'] : []) 
  // console.log('postPlugins:',postPlugins);

  const common = {
    entry:{
      app:"./app.js",
    },
    output:{
      filename:'boundle.js'
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
      // new extractTextCss("styles.css")
      // new extractTextCss({
      //   filename: env.pro ? 'bundle.css':'dev.css'
      // }),
    ]
  }
   return merge(common,env.pro ? pro : dev)
}
