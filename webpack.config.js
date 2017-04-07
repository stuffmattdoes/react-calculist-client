/*
    webpack.config.js
*/

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: 'public/js',
        filename: 'bundle.js'
    },

    // Need to redirect dev server to our index.html file
    devServer: {
        contentBase: 'public',
        // If you are using the HTML5 history API you probably need
        // to serve your index.html in place of 404 responses
        // historyApiFallback: true
    },
    module: {
        loaders: [

            // Scripts
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },

            // Styles
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap')
            }
        ]
    },
    plugins: [
        // Write an actual .CSS file
        // Path is relative to final bundle.js file
        new ExtractTextPlugin('../css/main.css')
    ]
}