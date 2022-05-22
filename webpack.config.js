const path = require('path')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")


module.exports = {
    mode:'development',
    entry: ['./index.js','./fetch.js'] ,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: true,
    plugins: [
        new NodePolyfillPlugin()
    ]
}