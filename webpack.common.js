const path = require('path');
const SRC_DIR = path.resolve(__dirname, './client/src');
const DIST_DIR = path.join(__dirname, './client/dist');

module.exports = {
  entry: {
    app: SRC_DIR,
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
				test: /\.(png|jpe?g|svg|gif)$/i,
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
		extensions: ['.js', '.jsx'],
  },
  // output: {
	// 	path: DIST_DIR,
	// 	filename: 'bundle.js',
	// 	publicPath: '/'
	// },
};