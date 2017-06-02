import * as path from 'path';
import * as webpack from 'webpack';

export default function webpackConfig(env: object = {}) {
    return <webpack.Configuration>{
        entry: './src/index.ts',
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: [
                        'node_modules'
                    ],
                    loader: 'ts-loader',
                    options: {
                        configFileName: './src/tsconfig.json'
                    }
                }
            ]
        },
        plugins: [

        ]
    };
}
