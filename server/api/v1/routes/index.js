'use strict';

/**
 * Module dependencies.
 */

var user = require('../controllers/user');

module.exports = function routes(app) {
  /**
   * users
   */
  console.log('in route');
  app.post('/api/v1/users', user.create);

};
