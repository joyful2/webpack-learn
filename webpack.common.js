const path = require('path')
const webpackSpriteSmith = require('webpack-spritesmith')
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
      app:"./src/app.js",
      // publicPath:'./test' // todo 作用是会给html中所有引入的路径加上这个路径前缀？
    },
    output:{
      filename:'boundle.js',
      // publicPath:'http://localhost:9001/' // todo 这么玩会不会有问题？
      // publicPath:'assets/img'
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
                  // plugins: postPlugins
                  plugins: [require('postcss-sprite')(
                    {
                      spritePath:'./dist/assets/sprite'
                    }
                  )]
                }
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
        },
        {
          // todo 为什么图片资源都没被打包？？
          test:/\.(jpg|png|gif|jgeg)$/,
          // use:'file-loader',
          use:[
          {
            // loader: 'file-loader',
            loader: 'url-loader', // 支持图片的引入
            options:{
              name:'[name].[hash:4].[ext]', // 默认是[hash].[ext]
              outputPath:'assets/img',
              publicPath:'assets/img', // 所有图片的地址都会加上这个前缀路径
              limit:50 // 小于limit值的图片被转未base64格式。 用于减少请求数，设置合适大小，太大会让css文件过大，请求很慢，太小，图片不能有效转为base64,减少请求数。一般设置5000b,依据实际情况来 
            }
          },
          {
            loader:'img-loader', // 图片的压缩等,需借助插件压缩
            options:{
              plugins:[
                // png的压缩。 通常压缩到原大小的一半
                require("imagemin-pngquant")(
                  {
                    speed: 2// 1-11 值越大，质量越好，体积越大
                  }
                ),
                require('imagemin-mozjpeg')( // jpg的压缩。 
                  {
                    quality: 80// 1-100 值越大，质量越好，体积越大.
                  }
                ),
                // gif的压缩。 
                require('imagemin-gifsicle')(
                  {
                  optimizationLevel: 1// 1-3 值越大，压缩越多. gif容易变得不清晰，通常给1
                  }
                )
              ]
            }
          }
        ]
        }
        
      ]
    },
    plugins:[
      new webpackSpriteSmith({
        src:{
          cwd:path.join(__dirname,'src/assets/img'), // 图片来源文件夹
          glob: '*.jpg' // 处理什么图片
          // glob: '*.*' 
        },
        target:{
          // 打包到哪
          image:path.join(__dirname,'./dist/sprites/sprite.png'),
          css:path.join(__dirname,'./dist/sprites/sprite.css') // 打包后，讲该css文件引入到需使用的文件，然后给html标签加上对应的类名即可
        },
        apiOptions:{
          // ./assets/img/b.jpg
          cssImageRef:"~sprite.png" //指定打包后的css文件中引入雪碧图的路径
        }
      }),
      // new extractTextCss("styles.css") // 热更新和extractTextCss不兼容，可配置disabled掉 extractTextCss todo : 这里配置报错待修复
      // new extractTextCss({
      //   filename: env.pro ? 'bundle.css':'dev.css'
      // }),
    ]
  }
   return merge(common,env.pro ? pro : dev)
}
