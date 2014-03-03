/*
 * GET users.
 */
var users = require('../models/users');

module.exports = {
  index: function (req, res, params)
  { 
    res.send(global.lang['hello.world']);
  },

  all: function (req, res, params)
  {
    users.getAll(function (error, result) {
      res.render('users/user', { users: result });
    });
  },

  get: function (req, res, params)
  {
    var id = params[0];

    users.get(id, function (error, result) {
      res.render('users/user', { users: result });
    });
  },

  email: function (req, res, params)
  {
    var email = params[0];

    users.getByEmail({ email: email }, function (error, result) {
      res.render('users/user', { users: result });
    });
  }
};