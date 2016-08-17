// The plugin that loads your source code in Aurelia.
var AureliaWebPackPlugin = require('aurelia-webpack-plugin');
// This is a node tool to resolve paths.
var path = require('path');
// We need this to use the CommonsChunkPlugin.
var webpack = require('webpack');
// The plugin that adds the script tags to our index.html
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        // Our app's entry point, this is set automatically by aurelia-webpack-plugin
        // using the files in the "src" folder that we're still going to create.
        // The app knows which of the files is our entry point because of the "aurelia-bootstrapper-webpack" 
        // who reads the entry point from the aurelia-app="main" in our index.html.
        'app': [],
        //These are all the aurelia libraries, they will be bundled separately from our app's main code.
        //I tried to bundle everything together, with no success.
        'aurelia': [
            'aurelia-bootstrapper-webpack',
            'aurelia-polyfills',
            'aurelia-pal',
            'aurelia-pal-browser',
            'aurelia-binding',
            'aurelia-dependency-injection',
            'aurelia-event-aggregator',
            'aurelia-framework',
            'aurelia-history',
            'aurelia-history-browser',
            'aurelia-loader',
            'aurelia-loader-webpack',
            'aurelia-logging',
            'aurelia-logging-console',
            'aurelia-metadata',
            'aurelia-path',
            'aurelia-route-recognizer',
            'aurelia-router',
            'aurelia-task-queue',
            'aurelia-templating',
            'aurelia-templating-binding',
            'aurelia-templating-router',
            'aurelia-templating-resources'
        ]
    },
    output: {
        //This is the folder where our packed app will be after we run webpack.
        path: './build',
        filename: 'scripts/[name].bundle.js',
        sourceMapFilename: 'scripts/[name].bundle.js.map'
    },
    module: {
        loaders: [
            //This loader runs babel for every js file so the files are transpiled to ES5 javascript.
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            //This loader reads our html templates that are referenced and bundles them with our javascript.
            { test: /\.html$/, loader:'html', exclude: path.resolve('src/index.html') }
        ]
    },
    plugins: [
        //The Aurelia Plugin.
        new AureliaWebPackPlugin(),
        // This is what will create a separate bundle for the libs under 'aurelia' 
        // in our entry section.
        new webpack.optimize.CommonsChunkPlugin({ name: ['aurelia']}),
        // This plugin will add our bundles to the html file and copy it 
        // to the build folder.
        new HtmlWebpackPlugin({
            template: 'index.html',
            chunksSortMode: 'dependency'
        }),
    ],
    // This is not necessary, it just changes the default port the
    // webpack-dev-server uses from 3000 to whatever you set.
    devServer: {
        port: 3333
    }
};