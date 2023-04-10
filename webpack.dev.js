/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: './dist',
    open: true,
    hot: true,
    host: 'localhost',
    port: 9000,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
  ],
});
