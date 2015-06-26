var jwt = require('jsonwebtoken');
var db = require('../../../../db');
var config = require('../../../../config');
var secret = config.name;
var moment = require('moment');
var now = moment().unix();

exports.isAuthed = function* (next) {
  var token = this.request.headers['access-token'];
  if (token) {
    try {
      var decoded = jwt.verify(token, secret);
      if (now < decoded.exp) {
        var phoneNumber = decoded.phoneNumber;
        var user = yield db.user.find({
          where: {
            phoneNumber: phoneNumber
          }
        });
        if (user) {
          this.request.user = user;
          yield next;
        } else {
          this.status = 401;
          this.body = {message: '用户不存在'};
        }
      } else {
        this.status = 401;
        this.body = {message: 'token过期'};
      }

    } catch (err) {
      this.status = 401;
      this.body = {message: 'token错误'};
    }
  } else {
    this.status = 401;
    this.body = {message: '无token'};
  }
};