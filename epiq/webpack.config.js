const config = require('./config');
const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: ['./src/view.comment.js'],
	output: {
		path: config.staticRoot,
		filename: '/js/view.comment.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ["es2015", "stage-2"]
				}
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				query: {
					name: '[name].[ext]?[hash]'
				},
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
//						js: 'babel-loader!eslint-loader',
						scss: 'style-loader?singleton!css-loader?minimize&url=false!sass-loader'
					}
				}
			}
		],

	},
	resolve: {
		alias: {
			'sass': path.resolve(__dirname, '../src/sass'),
			'scripts': path.resolve(__dirname, '../src/scripts'),
		}
	},

	devServer: {
		hot: true,
		port: 8080,
		proxy: {
			'**': {
				target: 'http://localhost:8000/',
				secure: false,
				prependPath: false
			}
		},
		publicPath: '/js/'
	},

	watch: true
}



if (process.env.NODE_ENV === 'production') {

	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	])
}