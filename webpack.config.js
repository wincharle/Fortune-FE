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
        'login': './src/page/login/index.js',
        'result': './src/page/result/index.js',
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