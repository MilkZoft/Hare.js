var db = require('./db/mysql');

module.exports = function(schema) {
  return {
    get: function(q, callback) {
      if (q == 'all') {
        schema.fields = (schema.fields) ? schema.fields : '*';
        
        db.findAll({ 
          table:  (schema.table)  ? schema.table  : false, 
          fields: (schema.fields) ? schema.fields : false, 
          group:  (schema.group)  ? schema.group  : false,
          order:  (schema.order)  ? schema.order  : false,
          limit:  (schema.limit)  ? schema.limit  : false
        }, callback);
      } else if (!isNaN(q)) {
        schema.key = (schema.key) ? schema.key : 'id';
        schema.fields = (schema.fields) ? schema.fields : '*';
        
        db.find({
          id:     (id)            ? parseInt(q)   : false, 
          table:  (schema.table)  ? schema.table  : false, 
          fields: (schema.fields) ? schema.fields : false, 
          key:    (schema.key)    ? schema.key    : false
        }, callback);
      } else if (typeof (q) == 'object') {
        var fields = Object.keys(q),
            count = fields.length - 1,
            query = '';

        if (fields.length > 1) {
          for (var i = 0; i <= count; i++) {
            if (i == count) {
              query += fields[i] + ' = \'' + q[fields[i]] + '\''; 
            } else {
              query += fields[i] + ' = \'' + q[fields[i]] + '\' AND ';
            }
          }

          db.findBySQL({
            query:  (query)         ? query         : false,
            table:  (schema.table)  ? schema.table  : false, 
            fields: (schema.fields) ? schema.fields : false,
            group:  (schema.group)  ? schema.group  : false,
            order:  (schema.order)  ? schema.order  : false,
            limit:  (schema.limit)  ? schema.limit  : false
          }, callback);
        } else {
          var field = fields[0],
              value = q[field];
          console.log(field);
          db.findBy({
            field:  (field)         ? field         : false, 
            value:  (value)         ? value         : false,
            table:  (schema.table)  ? schema.table  : false, 
            fields: (schema.fields) ? schema.fields : false, 
            group:  (schema.group)  ? schema.group  : false,
            order:  (schema.order)  ? schema.order  : false,
            limit:  (schema.limit)  ? schema.limit  : false
          }, callback);
        }
      }

      return false;
    }
  };
}