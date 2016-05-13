var express = require('express');
var util = require('util');
var fs = require('fs');
var path = require('path');
var request = require('request');

var logger = require('../assets/logger');

var router = express.Router();

////////////////////////////
// response type
////////////////////////////

// text/plain
router.get('/res/txt', function (req, res) {
  res.status(200) // Status Code:
    .type('txt') // Content-Type
    // .type('text/plain') // Content-Type
    .send('ok') // response
});

// application/json
router.get('/res/json', function (req, res, next) {
  res.status(200)
    .type('json')
    .send({
      "msg": "ok"
    });
});

// application/xml
router.get('/res/xml', function (req, res, next) {
  res.type('xml');
  res.status(200);
  res.send('<root><username>admin</username><token>123456</token></root>');
});


////////////////////////////
// query parameter
////////////////////////////
router.get('/query', function (req, res) {
  logger.debug('query parameter ');
  logger.debug(req.query)
  res.send(req.query);
});

////////////////////////////
// body parameter
////////////////////////////
router.post('/post', function (req, res) {
  logger.debug('post parameter ');
  logger.debug(req.body)
  res.send(req.body);
});

////////////////////////////
// uri parameter
////////////////////////////
router.post('/uri/:username/:token', function (req, res) {
  logger.debug('uri parameter ');
  logger.debug(req.params)
  res.send(req.params);
});


////////////////////////////
// file upload
////////////////////////////
router.post('/upload', function (req, res) {
  var body = req.body;
  var files = req.files;

  logger.debug('upload parameter ');
  logger.debug(body)
  logger.debug(files)

  // 文件上传,返回文件的原始文件名
  var data = body;
  for (var field in files) {
    data[field] = files[field].originalname;
  }

  res.send(data);

});


////////////////////////////
// file download
////////////////////////////
router.get('/download', function (req, res) {
  logger.debug('download parameter ');
  logger.debug(req.query)
  request(req.query.url).pipe(res);
});

module.exports = router;