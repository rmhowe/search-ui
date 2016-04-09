var webpack = require('webpack');

module.exports = {
  entry: {
    app: ["webpack/hot/dev-server", "./src/js/index.js"]
  },

  output: {
    path: "./dist/js",
    publicPath: "dist/js",
    filename: "app.js"
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|vendor)/ },
      { test: /\.css$/, loader: 'style!css!postcss', exclude: /src\/fonts/ },
      { test: /\.(png|woff|woff2|eot|ttf|svg)/, loader: 'url-loader?limit=10000' }
    ]
  },

  postcss: function(webpack) {
    return [
      require('postcss-import')({
        addDependencyTo: webpack
      }),
      require('postcss-cssnext'),
      require('precss')
    ];
  }
};
