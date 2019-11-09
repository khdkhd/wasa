const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
// const webpack = require('webpack')

function isProd(env) {
	return env === 'prod';
}

function getPluginConfig(env) {
	const plugins = [];
	if (isProd(env)) {
		plugins.push(new CleanPlugin(['dist']));
	}
	return plugins;
}

const config = env => ({
	entry: {
		wasa: './src/index.js',
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2017'],
						plugins: [
							'transform-runtime',
							'transform-es2015-block-scoping',
						],
					},
				},
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			'@': path.resolve('./src'),
		},
		modules: [
			path.resolve('./node_modules'),
		],
	},
	plugins: getPluginConfig(env),
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		library: 'wasa',
		libraryTarget: 'commonjs',
	},
	externals: {
		ramda: {
			commonjs: 'ramda',
			commonjs2: 'ramda',
			amd: 'ramda',
		},
		rxjs: {
			commonjs: 'rxjs',
			commonjs2: 'rxjs',
			amd: 'rxjs',
		},
	},
});

module.exports = config;
