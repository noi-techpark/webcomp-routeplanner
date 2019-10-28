const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './route_widget.js'),
  watch: true,
  output: {
    path: path.resolve(__dirname, '../../work/scripts'),
    filename: 'route_widget.js'
  },
  // webpack-dev-server configuration
  devServer: {
    contentBase: path.resolve(__dirname, '../../work'),
    publicPath: '/scripts/',
    watchContentBase: true,
    compress: true,
    port: 8080,
    open: true,
    openPage: 'routeplanner.html',
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
