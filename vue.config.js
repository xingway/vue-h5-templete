const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

const resolve = dir => {
    return path.join(__dirname, dir)
}
module.exports = {
    devServer: {
        port: 8085,     // 端口
    },
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'))
            .set('@api', resolve('src/api'))
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
    
    },
    configureWebpack:config => {
        if(process.env.NODE_ENV === 'production'){
            config.optimization= {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    terserOptions: {
                    compress: {
                        //warnings: false,
                        drop_console: true,//console
                        //drop_debugger: false,
                        //pure_funcs: ['console.log']//移除console
                    }
                    }
                })
            ]
            }
        }
        
        },
        // 设为false打包时不生成.map文件
        productionSourceMap: false,
}