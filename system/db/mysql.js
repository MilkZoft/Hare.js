/*
 * MySQL
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: global.config.db.host,
  user: global.config.db.user,
  password: global.config.db.password,
  database: global.config.db.database
});

module.exports = {
  find: function (options, callback)
  { 
    if (!options.id || !options.table) {
      return false;
    }

    var fields = (options.fields) ? options.fields : '*',
        sql = 'SELECT ' + fields + ' FROM ' + options.table + ' WHERE id = ' + options.id;

    global.debug.set({ 
      file: 'db/mysql.js', 
      l: 23, 
      f: 'find', 
      s: sql
    });

    connection.query(sql, callback);
  }
};