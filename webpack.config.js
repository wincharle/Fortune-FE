const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getHtmlConfig = (name) => {
    return {
        template: `./src/view/${name}.html`,
        filename: `view/${name}.html`,
        inject: true,
        hash: true,
        chunks: ['vendor', 'common', name]
    }
}

const config = {
    mode: 'development',
    entry: {
        'common': './src/page/common/index.js',
        'index': './src/page/index/index.js',
        'login': './src/page/login/index.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.join(__dirname, '/dist'),
        publicPath: '/dist'
    },
    externals: {
        jquery: 'jQuery'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 100,
                },
                common: {
                    chunks: "all",
                    test: /[\\/]src[\\/]/,
                    name: "common",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 1
                }
            }
        }
    },
    plugins: [
        //new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        new HtmlWebpackPlugin(getHtmlConfig('index'))
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
                test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
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
        inline: true
    }
}


module.exports = config;