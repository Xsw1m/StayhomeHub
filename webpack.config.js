var path = require('path')
//在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把
//打包好的bundle注入到页面底部
//如果要配置插件，需要在导出的对象中，挂载plugins节点
var htmlWebpackPlugin = require('html-webpack-plugin')
// 在vue-loader 15版本之后，必须伴生VueLoaderPlugin才能使用
const VueLoaderPlugin = require('vue-loader/lib/plugin')
//打包文件分析工具
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    entry:
        path.join(__dirname,'./src/main.js'),
        // app:'./src/main.js',
        // vendor:'element-ui',
    
    output: {
        path:path.join(__dirname,'./dist'),
        // filename:'bundle.js'   
        // filename:'[name].js'   
        // publicPath:'dist/'
    },
    plugins:[   //所有webpack插件的配置节点
        // new CleanWebpackPlugin(),  //删除上次打包的文件。默认目录为.dist  windows会出现bug，权限的问题
        new htmlWebpackPlugin({
            template:path.join(__dirname, './src/index.html'),//指定模板文件路径
            filename:'index.html',  //设置生成的内存页面名称
            favicon:'./src/images/ficon.jpg',   //图标
            minify:{
                removeComments:true,       //移除HTML中的注释
                collapseWhitespace:true,    //删除空白符和换行符
                removeAttributeQuotes:true       //去除属性引用
            }
        }),
        // 在vue-loader 15版本之后，必须伴生VueLoaderPlugin才能使用
        new VueLoaderPlugin(),
        //打包文件分析工具
        // new BundleAnalyzerPlugin(),
    ],
    optimization: {
        splitChunks: {
            maxInitialRequests: 8,
            chunks: "all",
            cacheGroups: {
              libs: {
                name: "chunk-libs",
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: "initial" // 只打包初始时依赖的第三方
              },
              core: {
                name: "core",
                test: /[\\/]core-js[\\/]/,
                priority: 40,
                // chunks: "initial" // 只打包初始时依赖的第三方
              },
              components: {
                name: "components",
                test: /[\\/]components[\\/]/,
                priority: 40,
                // chunks: "initial" // 只打包初始时依赖的第三方
              },
              src: {
                name: "src",
                test: /[\\/]src[\\/]/,
                priority: 30,
                // chunks: "initial" // 只打包初始时依赖的第三方
              },
              theme: {
                name: "theme",
                test: /[\\/]theme[\\/]/,
                priority: 30,
                // chunks: "initial" // 只打包初始时依赖的第三方
              },
              elementUI: {
                name: "chunk-elementUI", // 单独将 elementUI 拆包
                priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                test: /[\\/]node_modules[\\/]element-ui[\\/]/
              },
              video:{
                  name:'video',
                  priority:15,
                  test:/[\\/]video.js[\\/]/
              },
              elementUiCss:{
                  name:'element-picker',
                  priority:30,
                  test:/[\\/]theme-chalk[\\/]/
              },
            //   picker:{
            //     name:'date-picker',
            //     priority:30,
            //     test:/[\\/]node_modules[\\/]element-ui[\\/]date-picker.js[\\/]/
            //     },
            //   commons: {
            //     name: "chunk-comomns",
            //     test: resolve("srca/components"), // 可自定义拓展你的规则
            //     minChunks: 2, // 最小共用次数
            //     priority: 5,
            //     reuseExistingChunk: true
            //   }
            }
          }
    },
    module:{   //配置所有第三方loader 模块的
        rules:[
            { test:/\.css$/,use:['style-loader','css-loader']}, //处理css文件的loader
            { test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            //处理less文件的loader
            { test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            //处理scss文件的loader
            { test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=33464&name=[hash:8]-[name].[ext]'}, //处理图片路径的loader
            // limit 给定的值，是图片的大小，单位是byte，如果我们引用的图片，大于或者等于给定的limit值，
            // 则不会被转为base64的字符串，如果图片小于给定的 limit 值，则会被转为 base64 的字符串
            { test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},  //处理字体文件的loader
            { test:/\.js$/,use:'babel-loader',exclude:/node_modules/},//配置babel来转换高级的ES语法
            { test:/\.vue$/,use:'vue-loader'}, //处理 .vue 文件的loader
        ]

    },
    resolve:{
        alias:{   //设置vue被导入时候的包的路径
            // 'vue$':"vue/dist/vue.js"
        }
    }
}