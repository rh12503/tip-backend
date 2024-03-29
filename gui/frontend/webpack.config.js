const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let imageSizeLimit = 9007199254740991; // Number.MAX_SAFE_INTEGER
let sourceDir = path.resolve(__dirname, 'src');
let buildDir = path.resolve(__dirname, 'build');

module.exports = {
	entry: {
		index: path.resolve(sourceDir, 'main.js')
	},
	output: {
		path: buildDir,
		filename: 'main.js'
	},
	optimization: {
		splitChunks: false
	},
	devServer: {
		disableHostCheck: true,
		contentBase: path.join(__dirname, 'src'),
		compress: true,
		open: true,
		port: 8090
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(png|gif|jpg|woff2?|eot|ttf|otf|svg)(\?.*)?$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: imageSizeLimit
						}
					}
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.html$/i,
				use: 'raw-loader',
			},
		]
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(sourceDir, 'index.html'),
					to: path.resolve(buildDir, 'index.html')
				},
			]
		})
	]
};
