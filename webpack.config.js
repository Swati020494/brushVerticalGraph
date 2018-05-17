const path = require('path');

const libraryName = 'layout';
const OUT_FILE = `${libraryName}.js`;

module.exports = {
    context: path.join(__dirname, './src'),
    entry: ['./index.js'],
    devtool: 'cheap-source-map',
    output: {
        filename: OUT_FILE,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.js$/,
                include: path.join(__dirname, './src'),
                use: ['babel-loader']
            }
        ]
    }
};
