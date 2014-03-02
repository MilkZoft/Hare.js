/*
 * GET users.
 */
var model = require('../system/model');

module.exports = {
  get: function (query, callback)
  {
    var User = new model({ 
      table: 'users', 
      fields: 'id, username, email', 
      key: 'id' 
    });

    User.get(query, callback);
  }
};