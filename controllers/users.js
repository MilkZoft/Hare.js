/*
 * GET users.
 */
var users = require('../models/users');

module.exports = {
  index: function (params)
  { 
    global.res.send(global.lang['hello.world']);
  },

  all: function (params)
  {
    users.getAll(function (error, result) {
      global.res.render('users/user', { users: result });
    });
  },

  get: function (params)
  {
    var id = params[0];

    users.get(id, function (error, result) {
      global.res.render('users/user', { users: result });
    });
  },

  email: function (params)
  {
    var email = params[0];

    users.getByEmailUsingQuery({ email: email }, function (error, result) {
      global.res.render('users/user', { users: result });
    });
  }
};