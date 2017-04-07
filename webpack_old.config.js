const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    context: __dirname + '/src/js',          // The directory of our main app file
    entry: './Index.js',                        // The main file for our app
    output: {
        path: __dirname + '/public/js',         // What directory should our compiled asset go?
        filename: './bundle.js'                   // What should our compiled asset be named?
    },
    devtool: 'source-map',                      // Includes a source map with our initial Javascript compilation
    devServer: {                                // Need to redirect dev server to our index.html file
        contentBase: __dirname + '/public',
        historyApiFallback: true,
        hot: true
    },
    module: {
        loaders: [

            // Scripts
            {
                test: /\.(js|jsx)$/,                // Define which files match the criteria for being run through loader
                exclude: /node_modules/,            // Define which files to exclude from being run through loader
                loader: 'babel',                    // 'babel-loader' instructs Webpack to use .babelrc file to define loaders here
                query: {                            // Arguments for the loader
                    presets: ['react', 'es2015'],
                    plugins: ['react-hot-loader/babel']
                }
            },

            // Styles
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('../css/main.css', {      // Write an actual .CSS file
            allChunks: true
        })
    ]
};

module.exports = config;