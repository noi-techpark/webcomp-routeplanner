const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = [
  {
    name: 'dist',
    mode: 'production',
    entry: path.resolve(__dirname, './src/route_widget.js'),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'routeplanner_widget.min.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.HERE_API_KEY': JSON.stringify(process.env.HERE_API_KEY)
      })
    ],
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
  },
  {
    name: 'netlify',
    mode: 'production',
    entry: path.resolve(__dirname, './src/route_widget.js'),
    output: {
      path: path.resolve(__dirname, './work/scripts'),
      filename: 'route_widget.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.HERE_API_KEY': JSON.stringify(process.env.HERE_API_KEY)
      })
    ],
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
  }
];
