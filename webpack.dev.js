const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function webpackConfig(env = {}) {
    return {
        devtool: "source-map",
        entry: './dev/example.tsx',
        output: {
            filename: 'dev.js',
            path: path.resolve(__dirname, 'dev/bundle'),
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                spark: path.resolve(__dirname, 'src')
            }
        },
        module: {
            rules: [{
                test: /\.ts(x)?$/,
                exclude: [
                    'node_modules'
                ],
                loader: 'ts-loader',
                options: {
                    configFileName: './dev/tsconfig.json'
                }
            }]
        },
        devServer: {
            contentBase: path.join(__dirname, 'dev'),
            port: 9000,
            overlay: true,
            historyApiFallback: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'dev/index.html',
                title: 'spark dev mode',
                chunksSortMode: 'dependency',
                inject: 'body'
            }),
        ]
    };
}