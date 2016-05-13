var should = require('should');
var fs = require('fs');
var path = require('path');

var config = require('../../config');
var logger = require('../../assets/logger');
var file = require('../../assets/file');

// 请求
var request = require('supertest').agent(require('../../app').listen());
// var request = require('supertest').agent('http://localhost:3000');


// 设置日志级别
logger.setLevel('info');

describe('GET请求', function () {

  it('没有URI参数', function (done) {
    request
      .get('/forwardserver/query')
      .query({
        username: 'hualuomoli',
        nickname: '花落莫离'
      })
      .expect(200)
      .expect(function (res) {
        res.body.should.be.deepEqual({
          username: 'hualuomoli',
          nickname: '花落莫离'
        })
      })
      .end(done);
  })

  it('包含URI参数', function (done) {
    request
      .get('/forwardserver/query/1234')
      .query({
        username: 'hualuomoli',
        nickname: '花落莫离'
      })
      .expect(200)
      .expect(function (res) {
        res.body.should.be.deepEqual({
          id: '1234',
          username: 'hualuomoli',
          nickname: '花落莫离'
        })
      })
      .end(done);
  })


  it('包含中文URI参数', function (done) {
    request
      .get('/forwardserver/query/1234/' + encodeURIComponent('测试'))
      .query({
        username: 'hualuomoli',
        nickname: '花落莫离'
      })
      .expect(200)
      .expect(function (res) {
        res.body.should.be.deepEqual({
          id: '1234',
          name: '测试',
          username: 'hualuomoli',
          nickname: '花落莫离'
        })
      })
      .end(done);
  })

});

describe('POST请求', function () {

  it('没有URI参数', function (done) {
    request
      .post('/forwardserver/send')
      .send({
        username: 'hualuomoli',
        nickname: '花落莫离'
      })
      .expect(200)
      .expect(function (res) {
        res.body.should.be.deepEqual({
          username: 'hualuomoli',
          nickname: '花落莫离'
        })
      })
      .end(done);
  })

  it('包含URI参数', function (done) {
    request
      .post('/forwardserver/send/1234')
      .send({
        username: 'hualuomoli',
        nickname: '花落莫离'
      })
      .expect(200)
      .expect(function (res) {
        res.body.should.be.deepEqual({
          id: '1234',
          username: 'hualuomoli',
          nickname: '花落莫离'
        })
      })
      .end(done);
  })


  it('包含中文URI参数', function (done) {
    request
      .post('/forwardserver/send/1234/' + encodeURIComponent('测试'))
      .send({
        username: 'hualuomoli',
        nickname: '花落莫离'
      })
      .expect(200)
      .expect(function (res) {
        res.body.should.be.deepEqual({
          id: '1234',
          name: '测试',
          username: 'hualuomoli',
          nickname: '花落莫离'
        })
      })
      .end(done);
  })

});

describe('文件上传', function () {

  // 设置超时时间为10s
  this.timeout(10000);

  // 文件来自百度图片
  var files = {
    photo: {
      url: 'http://h.hiphotos.baidu.com/image/pic/item/3bf33a87e950352ad1e056095143fbf2b2118b29.jpg',
      filename: '3bf33a87e950352ad1e056095143fbf2b2118b29.jpg'
    },
    picture: {
      url: 'http://img1d.xgo-img.com.cn/pics/1717/1716154.jpg',
      filename: '1716154.jpg'
    }
  }
  var req = require('request');

  it('没有URI参数', function (done) {
    request
      .post('/forwardserver/upload')
      .field('username', 'hualuomoli')
      .field('nickname', '花落莫离')
      .attach('photo', req(files.photo.url))
      .attach('picture', req(files.picture.url))
      .expect(200)
      .expect(function (res) {
        res.body.should.be.deepEqual({
          username: 'hualuomoli',
          nickname: '花落莫离',
          photo: files.photo.filename,
          picture: files.picture.filename
        })
      })
      .end(done);
  })

  it('包含URI参数', function (done) {
    request
      .post('/forwardserver/upload/1234')
      .field('username', 'hualuomoli')
      .field('nickname', '花落莫离')
      .attach('photo', req(files.photo.url))
      .attach('picture', req(files.picture.url))
      .expect(200)
      .expect(function (res) {
        res.body.should.be.deepEqual({
          id: '1234',
          username: 'hualuomoli',
          nickname: '花落莫离',
          photo: files.photo.filename,
          picture: files.picture.filename
        })
      })
      .end(done);
  })


  it('包含中文URI参数', function (done) {
    request
      .post('/forwardserver/upload/1234/' + encodeURIComponent('测试'))
      .field('username', 'hualuomoli')
      .field('nickname', '花落莫离')
      .attach('photo', req(files.photo.url))
      .attach('picture', req(files.picture.url))
      .expect(200)
      .expect(function (res) {
        res.body.should.be.deepEqual({
          id: '1234',
          name: '测试',
          username: 'hualuomoli',
          nickname: '花落莫离',
          photo: files.photo.filename,
          picture: files.picture.filename
        })
      })
      .end(done);
  })

});