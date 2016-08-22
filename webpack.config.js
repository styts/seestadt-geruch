var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
});

module.exports = {
  entry: "./js/app.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  plugins: [
    definePlugin,
    new webpack.ContextReplacementPlugin(
      /moment[\\\/]locale$/, /^\.\/(en|de)$/)
],
};
