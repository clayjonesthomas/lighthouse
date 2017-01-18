var path = require("path");

module.exports = {
  context: __dirname,
  entry: path.join(__dirname,'/src/index.js'),
  output: {
    path: path.join(__dirname,'/src/bundled_web'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname,'/src'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader'
      },
    ],
  },
};