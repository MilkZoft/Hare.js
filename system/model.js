var db = require('./db/mysql');

module.exports = function(schema) {
  return {
    get: function(query, callback) {
      if (!schema.table) {
        return false;
      }

      if (!isNaN(query)) {
        schema.key = (schema.key) ? schema.key : 'id';
        schema.fields = (schema.fields) ? schema.fields : '*';
        
        db.find({
          id: parseInt(query), 
          table: schema.table, 
          fields: schema.fields, 
          key: schema.key
        }, callback);
      } else {
        
      }

      return false;
    }
  };
}