var path = require('path');
var webpack = require('webpack');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  entry: './src/lib/index.js',
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/lib/',
    filename: 'vue-fontawesome.js',
    library: 'vue-fontawesome',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolveLoader: {
    modules: [path.join(__dirname, '../node_modules')],
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue-loader',
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      query: {
        name: '[name].[ext]?[hash]',
      },
    }],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  devtool: '#eval-source-map',
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new LodashModuleReplacementPlugin,
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ]);
}
