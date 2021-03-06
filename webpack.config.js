const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: path.join(__dirname, 'src', 'app-client.js'),
	output: {
		path: path.join(__dirname, 'static', 'js'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: path.join(__dirname, 'src'),
			loader: ['babel-loader'],
			query: {
				cacheDirectory: '.babel_cache',
				presets: ['react', 'es2015']
			}
		}]
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
	]
};