var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: [
            path.join(__dirname, 'src', 'js', 'app.js')
        ],
        vendors: [
            'vue',
            'vue-resource',
            'moment'
        ]
    },
    output: {
        path: path.join(__dirname, 'public', 'assets'),
        publicPath: '/assets/',
        filename: "bundle.js",
        chunkFilename: '[chunkhash].chunk.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            '_BROWSER': true
        }),
        new webpack.ProvidePlugin({
            'window.moment': 'moment',
            'moment': 'moment'
        }),
        new CopyWebpackPlugin([
            { from: path.join(__dirname, 'src', 'public'), to: '../' }
        ]),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('style.css', {
            allChunks: true
        })
    ],
    // devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: [ 'es2015' ]
                }
            },
            {   test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            { test: /\.png$/,  loader: "url-loader?limit=1000" },
            { test: /\.jpg$/,  loader: "url-loader?limit=1000" },
            { test: /\.gif$/,  loader: "url-loader?limit=1000" },
            { test: /\.woff$/, loader: "url-loader?limit=1000" }
        ],
        noParse: [
            'vue/dist/vue.min.js',
            'vue-resource/dist/vue-resource.min.js',
            '/moment-with-locales/'
        ]
    },
    externals: {
        jQuery: true
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.min.js',
            'vue-resource$': 'vue-resource/dist/vue-resource.min.js',
            'moment': 'moment/min/moment-with-locales.min.js'
        }
    }
};