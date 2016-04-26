module.exports = {
    entry: "./index.js",
    output: {
        publicPath: '',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
            { test: /\.css$/, loader: 'style-loader!css-loader', exclude: /node_modules/ },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,  exclude: /node_modules/,loader: "file" },
            { test: /\.(woff|woff2)$/,  exclude: /node_modules/, loader:"url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,  exclude: /node_modules/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,  exclude: /node_modules/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            { test: /jquery\.js$/, loader: 'expose?jQuery' },
            { test: /jquery\.js$/, loader: 'expose?$' },
            { test: /jquery\..*\.js/, loader: "imports?$=jquery,jQuery=jquery,this=>window" }
        ]
    }
}
