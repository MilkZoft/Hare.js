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
      global.debug.set('find(): Missing id or table!');      
    }

    var fields = (obj.fields) ? obj.fields : '*',
        sql  = 'SELECT ' + fields        + ' ';
        sql += 'FROM '   + obj.table + ' ';
        sql += 'WHERE '  + obj.key   + ' = ' + obj.id;

    global.debug.set({ 
      file: 'db/mysql.js', 
      l: 28, 
      f: 'find', 
      s: sql
    });

    connection.query(sql, callback);
  },

  findAll: function (obj, callback)
  { 
    if (!obj.table) {
      global.debug.set('findAll(): Missing table!');      
    }

    var fields = (obj.fields) ? obj.fields : '*',
        group  = (obj.group) ? ' GROUP BY ' + obj.group + ' ' : '',
        order  = (obj.order) ? ' ORDER BY ' + obj.order + ' ' : '',
        limit  = (obj.limit) ? ' LIMIT ' + obj.limit + ' ' : '',        
        sql    = 'SELECT ' + fields    + ' ';
        sql   += 'FROM '   + obj.table + ' ';
        sql   += group,
        sql   += order,
        sql   += limit;

    global.debug.set({ 
      file: 'db/mysql.js', 
      l: 54, 
      f: 'findByAll', 
      s: sql
    });

    connection.query(sql, callback);
  },

  findBy: function (obj, callback)
  { 
    if (!obj.table) {
      global.debug.set(global.lang.errors.db['missing.table']);
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
      l: 81, 
      f: 'findBy', 
      s: sql
    });

    connection.query(sql, callback);
  },

  findBySQL: function (obj, callback)
  { 
    if (!obj.table) {
      global.debug.set(global.lang.errors.db['missing.table']);
    }

    if (!obj.query) {
      global.debug.set('findBySQL(): Missing table or query!');
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
      l: 108, 
      f: 'findBySQL', 
      s: sql
    });

    connection.query(sql, callback);
  },

  findFirst: function (obj, callback)
  { 
    if (!obj.table) {
      global.debug.set('findFirst(): Missing table!');      
    }

    var fields = (obj.fields) ? obj.fields : '*',       
        sql    = 'SELECT ' + fields    + ' ';
        sql   += 'FROM '   + obj.table + ' ';
        sql   += 'LIMIT 1'

    global.debug.set({ 
      file: 'db/mysql.js', 
      l: 129, 
      f: 'findFirst', 
      s: sql
    });

    connection.query(sql, callback);
  },

  findLast: function (obj, callback)
  { 
    if (!obj.table || !obj.key) {
      global.debug.set('findLast(): Missing table or key!');      
    }

    var fields = (obj.fields) ? obj.fields : '*',       
        sql    = 'SELECT ' + fields    + ' ';
        sql   += 'FROM '   + obj.table + ' ';
        sql   += 'ORDER BY ' + obj.key + ' DESC LIMIT 1';

    global.debug.set({ 
      file: 'db/mysql.js', 
      l: 129, 
      f: 'findFirst', 
      s: sql
    });

    connection.query(sql, callback);
  },

  query: function(query, callback)
  {
    if (!query) {
      global.debug.set('query(): Your query is missing!');
    }

    connection.query(sql, callback);
  }
};