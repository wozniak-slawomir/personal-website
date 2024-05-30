const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.ts',
    target: 'node',
    mode: 'production',
    plugins: [
        new Dotenv(),
    ],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};