const path = require("path");
module.exports = {
    publicPath:'./',
    configureWebpack: {
        // //关闭 webpack 的性能提示
        // performance: {
        //     hints:false
        // },

        //或者

        //警告 webpack 的性能提示
        performance: {
            hints:'warning',
            //入口起点的最大体积
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    },
    chainWebpack: config => {
        // config.module
        //   .rule('css')
        //     .test(/\.css$/)
        //     .oneOf('vue')
        //     .resourceQuery(/\?vue/)
        //     .use('px2rem')
        //       .loader('px2rem-loader')
        //       .options({
        //         remUnit: 75
        //       })
        // config.module
        // .rule('scss')
        // .oneOf('vue')
        // .use('px2rem-loader')
        // .loader('px2rem-loader')
        // .before('postcss-loader') // this makes it work.
        // .options({ remUnit: 50, remPrecision: 8 })
        // .end()
      },
    devServer: {
      port: 8080, // 端口号
      host: "localhost",
      // https: false, // https:{type:Boolean}
      open: true, //配置自动启动浏览器
      // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    //   proxy: {
    //     "/api": {
    //       target: "<url>",
    //       ws: true,
    //       changeOrigin: true
    //     },
    //     "/foo": {
    //       target: "<other_url>"
    //     }
    //   } // 配置多个代理
    },
    lintOnSave: false, // 关闭eslint代码检查
    css: {  //配合使用postcss、flexible
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue : 37.5, // 换算的基数
                        selectorBlackList  : ['vant',], // 忽略转换正则匹配项
                        propList   : ['*'],
                    }),
                ]
            }
        }
    },
    // pluginOptions: {     //主要针对于px转rem(移动端)
    //     "style-resources-loader": {
    //         preProcessor: "scss",
    //         patterns: [
    //             //这个是加上自己的路径，
    //             //注意：试过不能使用别名路径
    //             path.resolve(__dirname, "./src/assets/mySass.scss")
    //         ]
    //     }
    // },
    // css: {   //主要针对于px转rem(移动端)
    //     loaderOptions: {
    //         sass: {
    //             // @是src的别名
    //             data: `
    //             @import "@/assets/mySass.scss";
    //           `
    //         },
    //     }
    // },
  };