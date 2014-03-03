/*
 * MySQL
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: global.config.db.host,
  user: global.config.db.user,
  password: global.config.db.password,
  database: global.config.db.database,
  debug: global.config.db.debug
});

module.exports = {
  find: function (obj, callback)
  { 
    if (!obj.id || !obj.table) {
      return false;
    }

    var fields = (obj.fields) ? obj.fields : '*',
        sql  = 'SELECT ' + fields        + ' ';
        sql += 'FROM '   + obj.table + ' ';
        sql += 'WHERE '  + obj.key   + ' = ' + obj.id;

    global.debug.set({ 
      file: 'db/mysql.js', 
      l: 25, 
      f: 'find', 
      s: sql
    });

    connection.query(sql, callback);
  },

  findBy: function (obj, callback)
  { 
    if (!obj.table) {
      return false;
    }

    var fields = (obj.fields) ? obj.fields : '*',
        group  = (obj.group) ? ' GROUP BY ' + obj.group + ' ' : '',
        order  = (obj.order) ? ' ORDER BY ' + obj.order + ' ' : '',
        limit  = (obj.limit) ? ' LIMIT ' + obj.limit + ' ' : '',        
        sql    = 'SELECT ' + fields    + ' ';
        sql   += 'FROM '   + obj.table + ' '; 
        sql   += 'WHERE '  + obj.field + ' = \'' + obj.value + '\'';
        sql   += group,
        sql   += order,
        sql   += limit;

    global.debug.set({ 
      file: 'db/mysql.js', 
      l: 70, 
      f: 'findBy', 
      s: sql
    });

    connection.query(sql, callback);
  },

  findBySQL: function (obj, callback)
  { 
    if (!obj.table || !obj.query) {
      return false;
    }

    var fields = (obj.fields) ? obj.fields : '*',
        group  = (obj.group) ? ' GROUP BY ' + obj.group + ' ' : '',
        order  = (obj.order) ? ' ORDER BY ' + obj.order + ' ' : '',
        limit  = (obj.limit) ? ' LIMIT ' + obj.limit + ' ' : '',        
        sql    = 'SELECT ' + fields    + ' ';
        sql   += 'FROM '   + obj.table + ' '; 
        sql   += 'WHERE '  + obj.query + ' ';
        sql   += group,
        sql   += order,
        sql   += limit;

    global.debug.set({ 
      file: 'db/mysql.js', 
      l: 82, 
      f: 'findBySQL', 
      s: sql
    });

    connection.query(sql, callback);
  },  
};