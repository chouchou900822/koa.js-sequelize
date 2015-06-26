'use strict';

/**
 * Module dependencies.
 */

var user = require('../controllers/user');

module.exports = function routes(app) {
  /**
   * users
   */
  app.post('/api/v1/users', user.create);
  app.post('/api/v1/users/login', user.login);

};
