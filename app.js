var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var colors = require('colors');

var config = require('./config');
var logger = require('./assets/logger');

var app = express();

// 设置端口
app.set('port', process.env.PORT || 3000);

// 图标
app.use(favicon(path.join(__dirname, './favicon.ico')));
// 请求日志
app.use(morgan('dev'));
// 文件上传
app.use(multer({
  dest: path.join(config.uploadpath)
}));
// 解析器
// 解析json
app.use(bodyParser.json());
// 解析urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// 解析cookie
app.use(cookieParser());

// 静态资源
// app.use(express.static(path.join(__dirname, 'client', 'dist')));


// 配置路由
require('./routes')(app);

// 启动服务
app.listen(app.get('port'), function () {
  logger.debug('server started in ' + app.get('port'));
})

// 导出app,方便mocha测试
module.exports = app;