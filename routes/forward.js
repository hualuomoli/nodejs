/**
 * https://github.com/request/request
 * 请求转发
 * nodejs作为前端的服务器,转发非nodejs处理的请求到web服务器
 */
var express = require('express');
var request = require('request');
var fs = require('fs');
var config = require('../config');
var logger = require('../assets/logger');

var router = express.Router();

// get 转发
router.get('/*', function (req, res) {
  var originalUrl = req.originalUrl;
  var forwardUrl = config.remoteUrl + originalUrl;
  logger.debug('转发GET请求');
  logger.debug(originalUrl);
  logger.debug(forwardUrl);
  request(forwardUrl).pipe(res);
})

// post 文件上传 转发
router.post('/*', function (req, res, next) {
  var contentType = req.headers['content-type'];
  if (contentType.match(/^multipart\/form-data/)) {
    var originalUrl = req.originalUrl;
    var forwardUrl = config.remoteUrl + originalUrl;
    logger.debug('转发POST文件上传请求');
    logger.debug(originalUrl);
    logger.debug(forwardUrl);

    // 文件透传
    var data = req.body;
    var files = req.files;
    for (var field in files) {
      var fieldFile = files[field];
      var file = {
        value: fs.createReadStream(fieldFile.path),
        options: {
          filename: fieldFile.originalname,
          contentType: fieldFile.mimetype
        }
      };
      data[field] = file;
    }
    // 发起请求
    request.post({
      url: forwardUrl,
      formData: data
    }).pipe(res);
  } else {
    next();
  }
})


// post 转发
router.post('/*', function (req, res) {
  var originalUrl = req.originalUrl;
  var forwardUrl = config.remoteUrl + originalUrl;
  logger.debug('转发POST请求');
  logger.debug(originalUrl);
  logger.debug(forwardUrl);
  request.post(forwardUrl).form(req.body).pipe(res);
})


module.exports = router;