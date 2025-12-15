const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'frontend', 'assets', 'js', 'index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public', 'assets', 'js')
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devtool: 'source-map'
}

