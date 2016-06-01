'use strict';

const webpack = require('webpack');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginAutoPrefix = require('less-plugin-autoprefix')
const path = require('path');
const pkg = require('./package.json');

let plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.OccurenceOrderPlugin()
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );
}

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    library: 'TMask',
    libraryTarget: 'umd',
    path: path.join(__dirname, pkg.dest),
    filename: '[name].js'
  },
  externals: {
    "react": {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    },
    "classnames": {
      root: "classnames",
      commonjs2: "classnames",
      commonjs: "classnames",
      amd: "classnames"
    }
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.less$/,
      loaders: [
        'style',
        'css',
        'less'
      ]
    }, {
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loaders: [
        'babel'
      ]
    }]
  },
  lessLoader: {
    lessPlugins: [
      new LessPluginCleanCSS({ advanced: true, keepSpecialComments: false }),
      new LessPluginAutoPrefix({ browsers: ['last 3 versions', 'Android 4'] })
    ]
  }
};
