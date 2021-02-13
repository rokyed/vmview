require('dotenv').config()
const {
  THEME
} = process.env
const themes = require('./themes.js')
const path = require('path');
// import ExtractTextPlugin from 'extract-text-webpack-plugin'

let Webpack = require('webpack');
const DIR_NAME = path.join(__dirname, 'injectable');
const StringReplacePlugin = require("string-replace-webpack-plugin");
const currentTheme = themes[THEME]


const jsProcessModules = []
if (currentTheme.jsUrlFix)
  jsProcessModules.push({
    loader: StringReplacePlugin.replace({
      replacements: currentTheme.jsUrlFix
    })
  })

jsProcessModules.push({
  loader: 'babel-loader'
})

module.exports = {
  mode: 'production',

  entry: {
    'script.js': currentTheme.js
  },
  output: {
    path: path.join(__dirname, './injectable/'),
    filename: '[name]',
    chunkFilename: '[id]',
  },

  target: 'web',
  module: {
    rules: [{
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'base64-inline-loader?name=[name].[ext]'
      },
      {
        test: /\.m?js$/,
        use: jsProcessModules
      }
    ]
  }
};
