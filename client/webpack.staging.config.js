var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var webpack = require('webpack');

let output_folder = path.resolve(__dirname, 'dist');

if (process.env.OUTPUT_PATH) {
  output_folder = path.resolve(__dirname, process.env.OUTPUT_PATH)
}

const extractSass = new MiniCssExtractPlugin({
  filename: "[name].[chunkhash].css",
  disable: false,
});

let plugins = [
  extractSass,
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    },
    __BASE_URL__: JSON.stringify(''),
    __ENV__: JSON.stringify('staging'),
  }),
  new webpack.HashedModuleIdsPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new UglifyJsPlugin({
    cache: true,
    parallel: true,
    sourceMap: true // set to true if you want JS source maps
  }),
  new OptimizeCSSAssetsPlugin({})
]

if (process.env.ANALYZE_BUILD) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  )
}

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    },
  },
  entry: {
    app: [
      'babel-polyfill', // ie 11 fix, for more details see https://github.com/facebook/react/issues/8379
      './main.js',
    ],
  },
  output: {
    path: output_folder,
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
  },
  devtool: "source-map", // Default development sourcemap
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ]
  }

});
