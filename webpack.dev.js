// eslint only run in src directory

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    open: true,
    hot: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
