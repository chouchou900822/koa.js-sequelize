'use strict';

/**
 * Module dependencies.
 */

var version = require('./package.json').version;
var name = require('./package.json').name;

var config = {
  version: version,
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  name: name
};

module.exports = config;
