const path = require('path');
const webpack = require('webpack');
const version = require('./package.json').version;

module.exports = {
  entry: './src/index',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    port: 3000,
    host: '127.0.0.1',
    static: './public',
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mewStorage.js',
    library: 'mewStorage',
    libraryTarget: 'umd',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(version)
    })
  ]
};
