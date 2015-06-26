'use strict';

var db = require('../../../../db');
var jwt = require('jsonwebtoken');
var config = require('../../../../config');
var moment = require('moment');
var client = require('../../../../redis');


exports.insert = function* (user) {
  var payload = {phoneNumber: user.phoneNumber};
  var secret = config.name;
  var token = jwt.sign(payload, secret, {expiresInSeconds: 60 * 60 * 24 * 7});
  var username = moment().unix();
  var hash = yield client.hgetall(user.phoneNumber);
  if (hash.code == user.code) {
    var results = yield db.user.findOrCreate({
      where: {
        phoneNumber: user.phoneNumber
      },
      defaults: {
        password: user.password,
        username: username
      }
    });
    if (results[1]) {
      return token;
    } else {
      return 'existError';
    }
  } else {
    return 'codeError';
  }
};
exports.get = function* (user) {
  var payload = {phoneNumber: user.phoneNumber};
  var secret = config.name;
  var token = jwt.sign(payload, secret, {expiresInSeconds: 60 * 60 * 24 * 7});
  var results = yield db.user.find({
    where: {
      phoneNumber: user.phoneNumber,
      password: user.password
    }
  });
  if (results) {
    return token;
  } else {
    return false;
  }
};
exports.update = function* (user, password, newPassword) {
  if (user.password == password) {
    var newUser = yield user.updateAttributes({
      password: newPassword
    });
    return newUser;
  } else {
    return false;
  }
};