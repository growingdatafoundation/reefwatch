var webpack = require("webpack");
var path = require('path');
module.exports = {
    context: __dirname,
    entry: "./index.js",
    output: {
        filename: 'bundle.js'
    },
    headers: { "Access-Control-Allow-Origin": "*"},
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/,  loader: 'babel-loader?presets[]=es2015&presets[]=react' }, //include: [ path.resolve("./node_modules/form-generator-react/dist") ],
            { test: /\.(css|scss})$/, loader: 'style-loader!css-loader'},
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,  exclude: /node_modules/,loader: "file" },
            { test: /\.(woff|woff2)$/,  exclude: /node_modules/, loader:"url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,  exclude: /node_modules/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,  exclude: /node_modules/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            { test: /jquery\.js$/, loader: 'expose?jQuery' },
            { test: /jquery\.js$/, loader: 'expose?$' },
            { test: /jquery\..*\.js/, loader: "imports?$=jquery,jQuery=jquery,this=>window" },
            { test: /\.png$/, loader: "url-loader?mimetype=image/png" }
        ]
    }
}
