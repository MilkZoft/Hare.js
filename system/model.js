var db = require('./db/mysql');

module.exports = function(schema) {
  return {
    get: function(q, callback) {
      if (!schema.table) {
        return false;
      }

      if (q == 'all') {
        schema.fields = (schema.fields) ? schema.fields : '*';
        
        db.findAll({ 
          table: schema.table, 
          fields: schema.fields,
          group: (schema.group) ? schema.group : false,
          order: (schema.order) ? schema.order : false,
          limit: (schema.limit) ? schema.limit : false
        }, callback);
      } else if (!isNaN(q)) {
        schema.key = (schema.key) ? schema.key : 'id';
        schema.fields = (schema.fields) ? schema.fields : '*';
        
        db.find({
          id: parseInt(q), 
          table: schema.table, 
          fields: schema.fields, 
          key: schema.key
        }, callback);
      } else if (typeof (q) == 'object') {
        var fields = Object.keys(q),
            count = fields.length - 1,
            query = '';

        if (fields.length > 1) {
          for (var i = 0; i <= count; i++) {
            query += (i == count) ? fields[i] + ' = \'' + q[fields[i]] + '\'': fields[i] + ' = \'' + q[fields[i]] + '\' AND ';
          }

          db.findBySQL({
            query: query,
            table: schema.table, 
            fields: schema.fields,
            group: (schema.group) ? schema.group : false,
            order: (schema.order) ? schema.order : false,
            limit: (schema.limit) ? schema.limit : false
          }, callback);
        } else {
          var field = fields[0],
              value = q[field];
          
          db.findBy({
            field: field, 
            value: value,
            table: schema.table, 
            fields: schema.fields,
            group: (schema.group) ? schema.group : false,
            order: (schema.order) ? schema.order : false,
            limit: (schema.limit) ? schema.limit : false
          }, callback);
        }
      }

      return false;
    }
  };
}