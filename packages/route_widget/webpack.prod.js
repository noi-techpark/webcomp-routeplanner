var path = require('path');

module.exports = {
  mode: 'production',
  entry: './route_widget.js',
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'dashboard_widget.min.js'
  },
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
