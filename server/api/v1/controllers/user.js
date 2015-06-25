'use strict';

var User = require('../models/user');

exports.create = function* () {

  var username = this.request.body.username;
  var phoneNumber = this.request.body.phoneNumber;
  var password = this.request.body.password;
  var email = this.request.body.email;
  var user = {
    username: username,
    phoneNumber: phoneNumber,
    password: password,
    email: email
  };
  var token = yield User.insert(user);

  this.body = {token: token};
  this.status = 201;
};
