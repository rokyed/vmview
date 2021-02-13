const path = require('path')
const fs = require('fs')
module.exports = {
  'none': {
    js: './src/themes/none/none.js',
    style: './src/themes/none/none.scss'
  },
  'DarkBone': {
    js: './src/themes/DarkBone/PVEDiscordDark/js/PVEDiscordDark.js',
    jsUrlFix: [{
      pattern: /\/pve2\/images/ig,
      replacement: function(match, p1, offset, string) {
        return './../images';
      }
    }],
    style: './src/themes/DarkBone/PVEDiscordDark/sass/PVEDiscordDark.sass',
    styleUrlFix: [{
      pattern: /\/pve2\/images/ig,
      replacement: function(match, p1, offset, string) {
        return './../images';
      }
    }],
    stylePathSolver: (url, origin) => {
      return fs.existsSync(path.join(path.join(path.join(origin, '..'),url)))
    }
  },
  'PVEDiscordDark-2021.01.10': {
    js: './src/themes/PVEDiscordDark-2021.01.10/PVEDiscordDark/js/PVEDiscordDark.js',
    jsUrlFix: [{
      pattern: /\/pve2\/images/ig,
      replacement: function(match, p1, offset, string) {
        return './../images';
      }
    }],
    style: './src/themes/PVEDiscordDark-2021.01.10/PVEDiscordDark/sass/PVEDiscordDark.sass',
    styleUrlFix: [{
      pattern: /\/pve2\/images/ig,
      replacement: function(match, p1, offset, string) {
        return './../images';
      }
    }],
    stylePathSolver: (url, origin) => {
      return fs.existsSync(path.join(path.join(path.join(origin, '..'),url)))
    }
  },
  'PVEDiscordDark': {
    js: './src/themes/PVEDiscordDark/PVEDiscordDark/js/PVEDiscordDark.js',
    jsUrlFix: [{
      pattern: /\/pve2\/images/ig,
      replacement: function(match, p1, offset, string) {
        return './../images';
      }
    }],
    style: './src/themes/PVEDiscordDark/PVEDiscordDark/sass/PVEDiscordDark.sass',
    styleUrlFix: [{
      pattern: /\/pve2\/images/ig,
      replacement: function(match, p1, offset, string) {
        return './../images';
      }
    }],
    stylePathSolver: (url, origin) => {
      return fs.existsSync(path.join(path.join(path.join(origin, '..'),url)))
    }
  }
}
