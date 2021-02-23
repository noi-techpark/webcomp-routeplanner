const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/route_widget.js'),
  watch: true,
  output: {
    path: path.resolve(__dirname, './work/scripts'),
    filename: 'route_widget.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.HERE_API_KEY': JSON.stringify(process.env.HERE_API_KEY)
    })
  ],
  // webpack-dev-server configuration
  devServer: {
    contentBase: path.resolve(__dirname, './work'),
    publicPath: '/scripts/',
    watchContentBase: true,
    compress: true,
    port: 8080,
    open: true,
    openPage: '',
    overlay: true
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }]
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {}
        }
      },
      {
        test: /\.(png|jpg|gif|ttf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  }
};
