const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 配置环境
    mode: 'development',

    devtool: 'source-map',

    // 配置入口
    entry: {
        'js/app': './src/app.js'
    },

    // 配置出口
    output: {
        // 物理路径
        path: path.join(__dirname, './dist'),
        filename: '[name].js'
    },

    // 
    module: {
        rules: [{
                test: /\.art$/,
                use: {
                    loader: 'art-template-loader',
                    options: {
                        escape: false
                    }
                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }


        ]
    },

    // 配置插件
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './public/index.html'),
            filename: 'index.html',
            inject: true
        }),
        new CopyPlugin([{
                from: './public/*.ico',
                to: path.join(__dirname, './dist/favicon.ico')
            },
            {
                from: './public/libs',
                to: path.join(__dirname, './dist/libs/')
            }
        ]),

        new CleanWebpackPlugin()
    ],

    // 配置server
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
        // 配置代理，解决跨域问题
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
            }
        }
    }
}