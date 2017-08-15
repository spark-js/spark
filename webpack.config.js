const path = require('path');
const webpack = require('webpack');
const UglifyJs = require('uglifyjs-webpack-plugin');

module.exports = function webpackConfig(env = {}) {
    return {
        entry: './src/index.ts',
        output: {
            filename: 'spark.umd.js',
            path: path.resolve(__dirname, 'release', 'umd'),
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
        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
            new UglifyJs()
        ]
    };
}