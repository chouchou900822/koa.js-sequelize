'use strict';
var client = require('../../../../redis');
exports.sendCode = function* (phoneNumber) {
  var Num = '';
  for (var i = 0; i < 6; i++) {
    Num += Math.floor(Math.random() * 10);
  }
  //todo add message service
  var hash = yield client.hgetall(phoneNumber);
  if (hash) {
    var count = parseInt(hash.count, 10);
    console.log(count);
    if (count < 6) {
      yield client.hmset(phoneNumber, {code: Num, count: count + 1});
      yield client.expire(phoneNumber, 600);
      return true;
    } else {
      return false;
    }
  } else {
    yield client.hmset(phoneNumber, {code: Num, count: 1});
    yield client.expire(phoneNumber, 600);
    return true;
  }
};