module.exports = {
  entry: './specs/testLoader.js',
  output: {
    path: "target",
    filename: 'test-bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: ['babel'],
      query: {
        presets: ['es2015'],
      },
    }],
  },
  devtool: 'source-map',

};
