var webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        './src/index.ts',
        '../examples/src/index.ts',
        '../webcomponent/src/index.ts',
        './example/index.ts'
    ],
    output: {
      publicPath: "/assets/",
      filename: "bundle.js"
    },

    devServer: {
        contentBase: './example'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
       { test: /\.html$/, exclude: /node_modules/, loader: 'html-loader?exportAsEs6Default'}
      ]
    },
});