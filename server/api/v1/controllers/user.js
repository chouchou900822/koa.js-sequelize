'use strict';

var User = require('../models/user');

exports.create = function* () {
  var phoneNumber = this.request.body.phoneNumber;
  var password = this.request.body.password;
  var user = {
    phoneNumber: phoneNumber,
    password: password
  };
  var token = yield User.insert(user);
  if (!token) {
    this.status = 403;
    this.body = "该手机号已经被注册！";
  } else {
    this.body = {token: token};
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
    this.body = "手机号或密码错误！";
  } else {
    this.body = {token: token};
    this.status = 201;
  }
};