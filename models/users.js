/*
 * GET users.
 */
var Model = require('../system/model');

module.exports = {
  get: function (query, callback)
  {
    var User = new Model({ 
      table: 'users', 
      fields: 'id, username, email', 
      key: 'id' 
    });

    User.get(query, callback);
  }
};