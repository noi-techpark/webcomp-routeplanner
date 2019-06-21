const path = require('path');

module.exports = {
  mode: 'development',
  entry: './route_widget.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, '../../work/scripts'),
    filename: 'route_widget.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }]
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
