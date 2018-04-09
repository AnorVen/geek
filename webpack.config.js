const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    app: './js/index.js'
  },

  output: {
    filename: 'index.js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build/js'),
   // publickPath: 'build/'
  },
  devServer: {
    overlay: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["es2015"/*,
            "env",
            "stage-3"*/]
        }
      }
    ]
  },

 /* plugins: [new UglifyJSPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
  ],
  */
  mode: 'development'
};
