var express = require('express');
var util = require('util');
var config = require('../config');

module.exports = function (app) {

  setCross(app);

  // demo
  app.use('/demo', require('./demo'));

  // 透传测试路由地址
  app.use('/forwardserver', require('./forward-server'));

  // 透传
  if (config.remoteUrl && config.remoteUrl.length > 0) {
    app.use('/', require('./forward'));
  }

  // end
}

function setCross(app) {

  //设置跨域访问
  app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1')
    next();
  });

}