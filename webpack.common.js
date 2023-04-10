/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const getPackageJson = require('./scripts/getPackageJson');

const { version, name, license, repository, author } = getPackageJson(
  'version',
  'name',
  'license',
  'repository',
  'author'
);

const banner = `
  ${name} v${version}
  ${repository.url}

  Copyright (c) ${author.replace(/ *<[^)]*> */g, ' ')} and project contributors.

  This source code is licensed under the ${license} license found in the
  LICENSE file in the root directory of this source tree.
`;

module.exports = {
  entry: {
    index: './src/index.ts'
  },
  mode: 'development',
  optimization: {
    usedExports: true
  },
  output: {
    filename: '[name].js', // filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    library: 'dg-relayrabbit-commons-js',
    libraryTarget: 'umd',
    clean: true,
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
      '!./src/**/*.spec.ts',
      '!./dist/**/*',
      '!./build/**/*',
      '!./scripts/**/*'
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin(banner),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js'],
      exclude: 'node_modules'
    })
  ]
};
