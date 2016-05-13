var log4js = require('log4js');
var fs = require('fs');

var file = {};


file.mkdirSync = function (dir) {
  if (fs.existsSync(dir)) {
    return;
  }
  fs.mkdirSync(dir);
  console.log('create folder '.green + dir);
}

module.exports = file;