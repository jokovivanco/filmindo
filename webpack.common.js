// eslint only run in src directory

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    assetModuleFilename: '[name][ext]',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
      title: 'Filmindo - Indonesian Movies Main Resources',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/assets', to: 'assets', force: true }],
    }),
    new webpack.DefinePlugin({
      TMDB_API_KEY: JSON.stringify('3623f7373a43a9e19f8efefa82292e09'),
    }),
  ],
};
