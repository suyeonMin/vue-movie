//웹팩 기본 구성옵션들 구성하는 곳 -> 프로젝트를 세세하게 조절할 수 있다.
//node.js에서 작동함.

//import
const path =  require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

//export
module.exports = {
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            //경로별칭
            '~': path.resolve(__dirname,'src'),
            'assets': path.resolve(__dirname, 'src/assets')
        }
    },

    //파일 읽어들이기 시작하는 진입점 설정. 일반적으로 js 파일 사용
    entry: './src/main.js',

    //결과물(번들)을 반환하는 설정
    output: {
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.s?css$/, 
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                  ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                use: 'file-loader'
            }
        ]
    },

    //번들링 후 결과물의 처리방식 등 다양한 플러그인들을 설정
    plugins: [
        new HtmlPlugin({
            template: './index.html'
        }),

        new CopyPlugin({
            patterns: [
                { from : 'static' }
            ]
        }), 
        new VueLoaderPlugin()
    ],

    devServer: {
        host: 'localhost'
    }, 
    
}