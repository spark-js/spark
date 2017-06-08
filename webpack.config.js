const path = require('path');
const webpack = require('webpack');

module.exports = function webpackConfig(env = {}) {
    return {
        entry: './src/index.ts',
        output: {
            filename: 'spark.umd.js',
            path: path.resolve(__dirname, 'dist'),
            library: "spark",
            libraryTarget: "umd"
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [{
                test: /\.ts$/,
                exclude: [
                    'node_modules'
                ],
                loader: 'ts-loader',
                options: {
                    configFileName: './tsconfig.bundle.json'
                }
            }]
        },
        plugins: []
    };
}