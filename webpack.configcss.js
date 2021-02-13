require('dotenv').config()
const {
  THEME
} = process.env
const themes = require('./themes.js')
const path = require('path');
const fs = require('fs')
// import ExtractTextPlugin from 'extract-text-webpack-plugin'

let Webpack = require('webpack');
const DIR_NAME = path.join(__dirname, 'injectable');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const currentTheme = themes[THEME]

const styleProcessModules = [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      url: currentTheme.stylePathSolver || false
    }
  }
]
if (currentTheme.styleUrlFix)
  styleProcessModules.push({
    loader: StringReplacePlugin.replace({
      replacements: currentTheme.styleUrlFix
    })
  })

styleProcessModules.push({
  loader: "sass-loader",
  options: {
    // Prefer `dart-sass`
    implementation: require("node-sass"),
  },
})

module.exports = {
  mode: 'production',

  entry: {
    'style': currentTheme.style
  },
  output: {
    path: path.join(__dirname, './injectable/'),
    filename: '[name].[id].css',
    chunkFilename: '[id]',
  },

  target: 'web',
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [{
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'base64-inline-loader?name=[name].[ext]'
      },
      {
        test: /\.s[ac]ss$/i,
        use: styleProcessModules,
      }
    ]
  }
};
