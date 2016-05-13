var path = require('path');

var config = {
  /** 日志目录 */
  logpath: path.join(__dirname, './logs'),
  /** 上传文件目录 */
  uploadpath: path.join(__dirname, './uploads'),
  /** 下载文件目录 */
  downloadpath: path.join(__dirname, './downloads'),
}

module.exports = config;