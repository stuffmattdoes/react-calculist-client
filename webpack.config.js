var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: __dirname + '/client/js/Index.js',                   // The main file for our app
    output: {
        path: __dirname + '/public/js',                      // The path to write our compiled app to
        filename: 'calculist.bundle.js'         // The new name for our compiled app
    },
    devtool: 'source-map',
    devServer: {                                // Need to redirect dev server to our index.html file
        contentBase: __dirname + "/public",
        hot: true
    },
    module: {                                   // Define which transformations to make on our code
        loaders: [                              // Instruct webpack to run source files through the specified loaders
            {
                test: /\.js$/,                  // Define which files match the criteria for being run through loader
                exclude: /node_modules/,        // Define which files to exclude from being run through loader
                loaders: [                      // Which loader is going to be used?
                    'babel-loader'              // 'babel-loader' instructs Webpack to use .babelrc file to define loaders here
                ]
            },
            {
                test: /\.scss$/,
                // loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ]
                loader: ExtractTextPlugin.extract(
                    'style', // The backup style loader
                    'css?sourceMap!sass?sourceMap'
                )
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('../css/main.css')              // Extract <style> tag in HTML and write to external CSS file
    ]
};
