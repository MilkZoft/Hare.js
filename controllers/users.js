/*
 * GET users.
 */
var users = require('../models/users');

module.exports = {
  index: function (req, res, params)
  { 
    res.send(global.lang['hello.world']);
  },

  get: function (req, res, params)
  {
    var id = params[0];

    users.get(id, function (error, result) {
      res.render('users_user', { users: result });
    });
  },

  email: function (req, res, params)
  {
    var email = params[0];

    users.get({ email: email }, function (error, result) {
      res.render('users_user', { users: result });
    })
  }
};