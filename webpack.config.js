const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		popup: './src/popup.js',
		devtools: './src/devtools.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/popup.html',
			filename: 'popup.html',
			chunks: ['popup'],
			inject: 'body',
		}),
		new HtmlWebpackPlugin({
			template: './public/devtools.html',
			filename: 'devtools.html',
			chunks: ['devtools'],
			inject: 'body',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'public/manifest.json', to: 'manifest.json' },
				{ from: 'public/background.js', to: 'background.js' },
				{ from: 'public/logo192.png', to: 'logo192.png' },
			],
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
};
