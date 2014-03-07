/*
 * GET users.
 */
var Model = require('../system/model');

module.exports = {
  get: function (id, callback)
  {
    var User = new Model({ 
      table: 'users', 
      fields: 'id, username, email', 
      key: 'id'
    });

    User.get(id, callback);
  },

  getByEmail: function (email, callback)
  {
    var User = new Model({ 
      fields: 'id, username, email', 
      order: 'username asc'
    });

    User.get(email, callback);
  },

  getByEmailUsingQuery: function (email, callback)
  {
    var User = new Model();
    User.query("SELECT * FROM users WHERE email = '" + email + "'", callback);
  },

  getAll: function (callback)
  {
    var User = new Model({ 
      table: 'users', 
      fields: 'id, username, email',
      group: 'username',
      order: 'username',
      limit: '0, 10'
    });

    User.get('all', callback);
  },

  getFirst: function (callback)
  {
    var User = new Model({ 
      table: 'users', 
      fields: 'id, username, email'
    });

    User.get('first', callback);
  }
};