const path = require('path');
const ReFreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
module.exports={
    name: 'gugudan',
    mode: 'development',
    devtool: 'eval', //production일땐 hidden-source-map
    resolve: {
        extensions:['.js', '.jsx']
    },
    entry:{
        app: ['./client']
    },
    module:{
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            // babel-loader에 대한 options
            options:{
                presets:[
                    ['@babel/preset-env', { //preset-env에 대한 options
                        targets:{   //browserslist사이트에 나와있음
                            browsers: ['> 5% in KR', 'last 2 chrome versions'],
                        },
                        debug: true,
                    }],
                     '@babel/preset-react'
                    ],
                plugins:['@babel/plugin-proposal-class-properties', 'react-refresh/babel'],
            },
        }],
    },
    plugins: [ //추가적으로 하고싶은 작업
        new ReFreshWebpackPlugin(),
        //new webpack.LoaderOptionsPlugin({debug:true}),//loader에options들에(xx)를 넣어줌
    ],
    output:{
        path: path.join(__dirname, 'app'),
        filename: 'app.js',
        publicPath: '/app/',
    },
    devServer:{
        publicPath: '/app/',
        hot: true,
    },
}