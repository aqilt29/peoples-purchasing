const path = require('path');
const SRC_DIR = path.join(__dirname, './client/src');
const DIST_DIR = path.join(__dirname, './client/dist');
const PUB_DIR = path.join(__dirname, './client/src/Assets');

module.exports = {
	mode: 'development',
	watch: true,
	devtool: 'inline-source-map',
	entry: SRC_DIR,
	output: {
		path: DIST_DIR,
		filename: 'bundle.js',
		publicPath: '/'
	},
	devServer: {
		contentBase: [DIST_DIR, PUB_DIR],
		port: 9000,
		historyApiFallback: true,
  },
	module: {
		rules: [
			{
				test: /\.jsx?/,
				include: SRC_DIR,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: ['@babel/preset-react', ['@babel/preset-env', {  targets: {  node: '10' } }]],
					plugins: [
						['babel-plugin-styled-components', { ssr: false }],
						['@babel/plugin-proposal-class-properties', { loose: true }],
					],
				},
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: "url-loader",
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};
