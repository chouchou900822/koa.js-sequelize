'use strict';

var db = require('../../../../db');
var jwt = require('jwt-simple');
var config = require('../../../../config');
var moment = require('moment');

//var decoded = jwt.decode(token, secret);

exports.insert = function* (user) {
  var payload = {phoneNumber: user.phoneNumber};
  var secret = config.name;
  var token = jwt.encode(payload, secret);
  var username = moment().unix();
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
    return false;
  }
};
exports.get = function* (user) {
  var payload = {phoneNumber: user.phoneNumber};
  var secret = config.name;
  var token = jwt.encode(payload, secret);
  var results = yield db.user.find({
    where: {
      phoneNumber: user.phoneNumber,
      password: user.password
    }
  });
  if(results){
    return token;
  } else {
    return false;
  }
};