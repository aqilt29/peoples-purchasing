const path = require('path');
const SRC_DIR = path.join(__dirname, './client/src');
const DIST_DIR = path.join(__dirname, './client/dist');

module.exports = {
	mode: 'development',
	watch: true,
	devtool: 'inline-source-map',
	entry: SRC_DIR,
	output: {
		path: DIST_DIR,
		filename: 'bundle.js',
	},
	devServer: {
    contentBase: DIST_DIR,
    port: 9000
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
        loader: 'svg-inline-loader'
    	}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};
