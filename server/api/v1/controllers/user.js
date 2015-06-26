'use strict';

var User = require('../models/user');
var Message = require('../middlewares/message');

exports.create = function* () {
  var code = this.request.body.code;
  var phoneNumber = this.request.body.phoneNumber;
  var password = this.request.body.password;
  var user = {
    phoneNumber: phoneNumber,
    password: password,
    code: code
  };
  var result = yield User.insert(user);
  switch (result) {
    case 'existError':
      this.status = 403;
      this.body = {message: "该手机号已经被注册！"};
      break;
    case 'codeError':
      this.status = 403;
      this.body = {message: "验证码错误！"};
      break;
    default:
      this.body = {token: result};
      this.status = 201;
  }
};
exports.login = function* () {
  var phoneNumber = this.request.body.phoneNumber;
  var password = this.request.body.password;
  var user = {
    phoneNumber: phoneNumber,
    password: password
  };
  var token = yield User.get(user);
  if (!token) {
    this.status = 403;
    this.body = {message: "手机号或密码错误！"};
  } else {
    this.body = {token: token};
    this.status = 201;
  }
};
exports.sendCode = function* () {
  var phoneNumber = this.request.body.phoneNumber;
  var result = yield Message.sendCode(phoneNumber);
  if (result) {
    this.status = 201;
    this.body = {message: '验证码发送成功!'};
  } else {
    this.status = 403;
    this.body = {message: '验证码发送达到上限，10分钟后再试!'};
  }
};
exports.resetPassword = function* () {
  var password = this.request.body.password;
  var newPassword = this.request.body.newPassword;
  var user = this.request.user;
  var result = yield User.update(user, password, newPassword);
  if (result) {
    this.status = 201;
    this.body = {newUser: result};
  } else {
    this.status = 403;
    this.body = {message: '原密码错误!'};
  }
};
exports.show = function*() {
};