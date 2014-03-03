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

  getByEmail: function (query, callback)
  {
    var User = new Model({ 
      table: 'users', 
      fields: 'id, username, email', 
      order: 'username asc'
    });

    User.get(query, callback);
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
  }
};