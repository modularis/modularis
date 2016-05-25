const autoprefixer = require('autoprefixer');
const path = require('path');
const nodeSassImportOnce = require('node-sass-import-once');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const sassLoaders = [
  'css-loader?sourceMap',
  'postcss-loader',
  'sass-loader?sourceMap',
  'import-glob-loader'
];

const config = {
  entry: {
    app: ['./js/index']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      }
    ]
  },
  sassLoader: {
    importer: nodeSassImportOnce
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
    publicPath: '/dist'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['dist'] }
      }
    )
  ],
  postcss: [
    autoprefixer
  ],
};

module.exports = config;
