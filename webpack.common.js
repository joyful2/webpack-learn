const path = require('path')
const webpackSpriteSmith = require('webpack-spritesmith')
var extractTextCss = require('extract-text-webpack-plugin')
var {CleanWebpackPlugin} = require('clean-webpack-plugin')
const dev = require('./webpack.dev.config.js')
const pro = require('./webpack.pro.config.js')
const {merge} = require('webpack-merge')
const webpack = require('webpack')
// console.log('merge:',merge);

module.exports = (env)=>{
  console.log('env:',env,env.pro);
  let postPlugins = ['autoprefixer']
  postPlugins = postPlugins.concat( env.pro ? ['postcss-sprite'] : [])
  // console.log('postPlugins:',postPlugins);

  const common = {
    entry:{
      // todo 配置多文件页面 第三方依赖，公共模块，webpack配置文件分别单独一个文件。 支持公共模块单独一个文件
      app:"./src/app.js",
      app2:"./src/app2.js",
      // publicPath:'./test' // todo 作用是会给html中所有引入的路径加上这个路径前缀？
    },
    output:{
      filename:'[name].boundle.js',
      // publicPath:'http://localhost:9001/' // todo 这么玩会不会有问题？
      // publicPath:'assets/img'
    },
    optimization:{
      // 压缩，代码分割相关都可写在这儿
      minimize:true, // 开启代码压缩，或去掉该配置，直接mode给 production 默认就是 minimize:true
      splitChunks:{
        name:false, // 依据模块名字去命名打包结果
        // name(module, chunks, cacheGroupKey) {
        //   console.log('module:',module);
        //   // console.log('chunks:',chunks);
        //   // console.log('cacheGroupKey:',cacheGroupKey);
        //   const moduleFileName = module
        //     .identifier()
        //     .split('/')
        //     .reduceRight((item) => item);
        //   // const allChunksNames = chunks.map((item) => item.name).join('~');
        //   return `${moduleFileName}`;
        // },
        miniSize:10000, // 文件小于这个大小的公共模块，就不单独打包（减少http请求）,开发模式默认10000,生产模式默认10000
        chunks:'all', // 所有东西都进行打包
        cacheGroups:{
          // 配置需要单独打包的
          mode1:{
            test:/mode1/
          }
        }
        // cacheGroups: {
        //   defaultVendors: {
        //     reuseExistingChunk: true,
        //   },
        // },
      },
      runtimeChunk:true // 是否单独打包运行时代码
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
      new CleanWebpackPlugin(), // 清理上次打包的代码 todo 为啥没生效？
      //-------------- webpack3 代码分割的写法如下： --------------
      // new webpack.optimize.CommonChunksPlugin({
      //   name:'vendor',
      //   minChunks:'infinity'
      // }),
      // new webpack.optimize.CommonChunksPlugin({
      //   name:'manifest',
      //   minChunks:'infinity'
      // }),
      // new webpack.optimize.CommonChunksPlugin({
      //   name:'app',
      //   minChunks:2
      // })
      // --------------  webpack3 代码分割的写法如上： --------------
      // new extractTextCss("styles.css") // 热更新和extractTextCss不兼容，可配置disabled掉 extractTextCss todo : 这里配置报错待修复
      // new extractTextCss({
      //   filename: env.pro ? 'bundle.css':'dev.css'
      // }),
      // new webpack.optimize.UglifyJsPlugin() // webpack3 代码压缩，tree-shaking的配置
    ]
  }
   return merge(common,env.pro ? pro : dev)
}
