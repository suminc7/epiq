var webpack = require("webpack");
// var path = require("path");

module.exports = {

    entry: {
        'join': "./front/src/scripts/views/join.js",
        'upload': "./front/src/scripts/views/upload.js",
        'login': "./front/src/scripts/views/login.js",
        'index': "./front/src/scripts/views/index.js",
        'view': "./front/src/scripts/views/view.js",
        'mypage': "./front/src/scripts/views/mypage.js",
        'channel': "./front/src/scripts/views/channel.js",
        'channel.user': "./front/src/scripts/views/channel.user.js",
        'premium': "./front/src/scripts/views/premium.js",
        'search': "./front/src/scripts/views/search.js",
        'account': "./front/src/scripts/views/account.js",
        'vrstar': "./front/src/scripts/views/vrstar.js",
        'others': "./front/src/scripts/views/others.js",
        'footer': "./front/src/scripts/views/footer.js",
        'top': "./front/src/scripts/views/top.js"
    },
    output: {
        path: __dirname + './epiqvr-web/epiqvr-top/src/main/resources/static/js/',
        filename: '[name].js',
    },


    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    watch: true,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ]


};

