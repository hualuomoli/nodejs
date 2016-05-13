var express = require('express');
var request = require('request');

var config = require('../config');
var logger = require('../assets/logger')

var router = express.Router();

// GET请求
router.get('/query', function (req, res) {
  var data = req.query;
  logger.debug('GET请求,没有URI参数');
  logger.debug(data);
  res.send(data);
})

router.get('/query/:id', function (req, res) {
  var data = req.query;
  data.id = req.params.id;
  logger.debug('GET请求,包含URI参数');
  logger.debug(data);
  res.send(data);
})

router.get('/query/:id/:name', function (req, res) {
  var data = req.query;
  data.id = req.params.id;
  data.name = req.params.name;
  logger.debug('GET请求,包含中文URI参数');
  logger.debug(data);
  res.send(data);
})

// POST请求
router.post('/send', function (req, res) {
  var data = req.body;
  logger.debug('POST请求,没有URI参数');
  logger.debug(data);
  res.send(data);
})

router.post('/send/:id', function (req, res) {
  var data = req.body;
  data.id = req.params.id;
  logger.debug('POST请求,包含URI参数');
  logger.debug(data);
  res.send(data);
})

router.post('/send/:id/:name', function (req, res) {
  var data = req.body;
  data.id = req.params.id;
  data.name = req.params.name;
  logger.debug('POST请求,包含中文URI参数');
  logger.debug(data);
  res.send(data);
})

// 文件上传
router.post('/upload', function (req, res) {
  var data = req.body;
  var files = req.files;
  logger.debug('POST请求,没有URI参数');
  logger.debug(data);
  logger.debug(files)

  // 文件上传,返回文件的原始文件名
  for (var field in files) {
    data[field] = files[field].originalname;
  }

  res.send(data);

})

router.post('/upload/:id', function (req, res) {
  var data = req.body;
  data.id = req.params.id;
  var files = req.files;
  logger.debug('POST请求,包含URI参数');
  logger.debug(data);
  logger.debug(files)

  // 文件上传,返回文件的原始文件名
  for (var field in files) {
    data[field] = files[field].originalname;
  }

  res.send(data);
})

router.post('/upload/:id/:name', function (req, res) {
  var data = req.body;
  data.id = req.params.id;
  data.name = req.params.name;
  var files = req.files;
  logger.debug('POST请求,包含中文URI参数');
  logger.debug(data);
  logger.debug(files)

  // 文件上传,返回文件的原始文件名
  for (var field in files) {
    data[field] = files[field].originalname;
  }

  res.send(data);
})

module.exports = router;