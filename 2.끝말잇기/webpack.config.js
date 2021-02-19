const path=require('path'); //webpack은 node가 돌리기때문에 import명령어는 error가 난다.
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
module.exports={
    name: 'wordrelay-setting',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry:{
        app: ['./client']
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['react-refresh/babel', '@babel/plugin-proposal-class-properties'],
            },
        }],
    },
    plugins:[
        new RefreshWebpackPlugin(),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/',
    },
    devServer: {
        publicPath: '/dist/',
        hot: true
    },
}