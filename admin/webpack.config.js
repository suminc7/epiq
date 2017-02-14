const webpack = require('webpack');
const path = require("path");

module.exports = {
	context: __dirname + '/src',
	entry: [
		'./index.js'
	],
	output: {
		path: path.resolve(__dirname, '../../epiqvr-web/epiqvr-admin/src/main/resources/static/js'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ['react', 'es2015', 'stage-1']
				}
			}
//			,
//			{
//				test: /\.scss$/,
//				loaders: ["style-loader", "css-loader", "sass-loader"]
//			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			"window.$": "jquery"
		})
	],
	resolve: {
		alias: {
			'jQuery': path.resolve(__dirname, "./node_modules/jquery/dist/jquery.js")
		},
		root: [
			path.resolve('./scss')
		],
	},
	watch: true
};
