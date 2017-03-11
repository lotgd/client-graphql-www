var path = require('path');
var webpack = require('webpack');
 
module.exports = {
    entry: './app/main.js',
        output: { path: __dirname, filename: 'web/bundle.js' },
        module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2016'],
                    plugins: [
                        __dirname + '/scripts/babelRelayPlugin.js',
                        "transform-decorators-legacy",
                        "transform-class-properties"
                    ]
                }
            }, {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
            }
        ]
    },
};