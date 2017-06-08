const path = require('path');
const webpack = require('webpack');

module.exports = function webpackConfig(env = {}) {
    return {
        devtool: "source-map",
        entry: './example/example.tsx',
        output: {
            filename: 'example.js',
            path: path.resolve(__dirname, 'example/bundle'),
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
                    configFileName: './example/tsconfig.json'
                }
            }]
        },
        plugins: []
    };
}