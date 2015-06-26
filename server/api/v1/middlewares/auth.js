var jwt = require('jwt-simple');
var db = require('../../../../db');
var config = require('../../../../config');
var secret = config.name;

exports.isAuthed = function* (next) {
  var token = this.request.headers['access-token'];
  if (token) {
    var decoded = jwt.decode(token, secret);
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
      this.body = {message: '请登陆!'};
    }
  } else {
    this.status = 401;
    this.body = {message: '请登陆!'};
  }
};