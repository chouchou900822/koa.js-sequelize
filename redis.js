'use strict';

var redis = require('then-redis');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/./config/config.json')[env];
var db = redis.createClient({
  host: config.redis_host,
  port: config.redis_port,
  password: config.redis_auth
});

module.exports = db;
