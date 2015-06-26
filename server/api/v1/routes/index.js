'use strict';

/**
 * Module dependencies.
 */

var user = require('../controllers/user');
var auth = require('../middlewares/auth');
module.exports = function routes(app) {
  /**
   * users
   */
  app.post('/api/v1/users', user.create);
  app.post('/api/v1/users/login', user.login);
  app.post('/api/v1/users/code', user.sendCode);
  app.put('/api/v1/users/reset-password', auth.isAuthed, user.resetPassword);

};
