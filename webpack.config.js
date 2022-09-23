const miniCss = require("mini-css-extract-plugin");
const browserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        "main": ["./resources/js/index.js", "./resources/scss/index.scss"]
    },
    output: {
        path: __dirname + "/src/js/",
        filename: "index.min.js"
    },
    watch: true,
    module: {
        rules: [{
            test:/\.(s*)css$/,
            use: [
                {
                    loader: miniCss.loader,
                    options: {
                        publicPath: ''
                    }
                },
                'css-loader',
                'sass-loader',
            ]
        },
        {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '../fonts/'
                    }
                }
            ]
        }]
    },
    plugins: [
        new miniCss({
            filename: "../css/index.min.css"
        }),
        new browserSyncPlugin({
            host: 'localhost',
            port: 3000,
            files: ['*.html'], // => files to watch
            server: {
                baseDir: [__dirname]
            },
            // proxy: 'http://localhost:8000/', => your local url
        })
    ]
};
