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
            presets: ['react', 'es2015'],
            plugins: [__dirname + '/scripts/babelRelayPlugin.js', "transform-class-properties"]
        }
      }
    ]
  },
};