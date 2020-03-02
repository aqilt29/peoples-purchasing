const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const SRC_DIR = path.join(__dirname, './client/src');
const DIST_DIR = path.join(__dirname, './client/dist');
const PUB_DIR = path.join(__dirname, './client/src/Assets');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: [SRC_DIR, 'react-hot-loader/patch'],
	output: {
		path: DIST_DIR,
		filename: 'bundle.js',
		publicPath: '/'
  },

	devServer: {
		contentBase: [DIST_DIR, PUB_DIR],
		hot: true,
		port: 9000,
		historyApiFallback: true,
  },

	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'react-dom': '@hot-loader/react-dom'
		}
	},

});
