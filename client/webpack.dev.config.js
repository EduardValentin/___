const merge = require('webpack-merge');
const webpack = require('webpack');
// const StyleLintPlugin     = require('stylelint-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    app: [
      'babel-polyfill', // ie 11 fix, for more detailse see https://github.com/facebook/react/issues/8379
      'webpack-dev-server/client?http://localhost:8080',
      './main.js',
    ],
  },
  watchOptions: {
    ignored: './app/templates',
  },
  output: {
    path: `${__dirname}/dist`, // `dist` is the destination
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  devServer: {
    port: 8080,
    contentBase: `${__dirname}/app`,
    inline: true,
  },
  devtool: 'eval-source-map',
  plugins: [
    // new StyleLintPlugin({
    //   configFile: '.stylelintrc',
    // }),
    new webpack.DefinePlugin({
      __BASE_URL__: JSON.stringify('http://localhost:3000'),
      __ENV__: JSON.stringify('dev'),
      __DEVELOPMENT__: true,
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
});
