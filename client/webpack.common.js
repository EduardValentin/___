const path                = require('path');
const CleanWebpackPlugin  = require('clean-webpack-plugin');
const HtmlWebpackPlugin   = require('html-webpack-plugin');

const config = {
  context: `${__dirname}/app`, // `__dirname` is root of project and `app` is source
  resolve: {
    modules: [path.resolve(__dirname, 'app'), path.resolve(__dirname, 'node_modules')],
    extensions: ['.js', '.scss'],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      beforeEmit: true,
    }),
    new HtmlWebpackPlugin({
      title: 'React KIT',
      template: 'index.ejs',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // Check for all js files
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        // options: {
        //   presets: ['@babel/preset-env', '@babel/preset-react'],
        //   cacheDirectory: true,
        // },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(gif|png|jpg)$/,
        loader: 'url-loader?limit=8192',
      },
    ],
  },
};

module.exports = config;
