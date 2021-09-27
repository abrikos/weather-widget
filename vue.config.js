const webpack = require('webpack')

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            })
        ],
        output:{
            filename:'weather-widget.js'
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    /*use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],*/
                }
            ]
        }
    },
    chainWebpack:
        config => {
            config.optimization.delete('splitChunks')
        },

}