'use strict';

var db = require('../../../../db');
var jwt = require('jwt-simple');
var config = require('../../../../config');

//var decoded = jwt.decode(token, secret);

exports.insert = function* (user) {
  var payload = {phoneNumber: user.phoneNumber};
  var secret = config.name;
  var token = jwt.encode(payload, secret);
  yield db.user.create({
    username: user.username,
    phoneNumber: user.phoneNumber,
    password: user.password,
    email: user.email
  });
  return token;
};