const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getHtmlConfig = (name, title) => {
    return {
        template: `./src/page/${name}/${name}.html`,
        filename: `view/${name}.html`,
        inject: true,
        hash: true,
        chunks: ['common', name],
        title: title
    }
}

const config = {
    mode: 'development',
    entry: {
        'index': './src/page/index/index.js',
        'result': './src/page/result/index.js',
        'user-login': './src/page/user-login/index.js',       
        'user-register': './src/page/user-register/index.js',
        'user-pass-reset': './src/page/user-pass-reset/index.js',
        'user-center': './src/page/user-center/index.js',
        'user-center-update': './src/page/user-center-update/index.js',
        'user-pass-update': './src/page/user-pass-update/index.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.join(__dirname, '/dist'),
        publicPath: '/dist'
    },
    resolve: {
        alias: {
            util: path.join(__dirname, '/src/util'),
            page: path.join(__dirname, '/src/page'),
            service: path.join(__dirname, '/src/service'),
            image: path.join(__dirname, '/src/image'),
            common: path.join(__dirname, '/src/common'),
            node_modules: path.join(__dirname, '/node_modules'),
        }
    },
    externals: {
        jquery: 'jQuery'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'common',
            minChunks: 2
        }
    },
    plugins: [
        //new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|woff|svg|eot|ttf|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        port: 9000,
        inline: true,
        proxy: {
            '/': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false
            }
        }
    }
}


module.exports = config;