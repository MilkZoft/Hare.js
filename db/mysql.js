/*
 * MySQL
 */
var mysql = require('mysql'),
	global = require('../config/config');

var connection = mysql.createConnection({
	host: global.config.db.host,
	user: global.config.db.user,
	password: global.config.db.password,
	database: global.config.db.database
});

module.exports = {
    find: function(options, callback)
    { 
    	if (!options.id || !options.table) {
    		return false;
    	}

    	connection.connect();

    	var fields = (options.fields) ? options.fields : '*';

    	var sql = 'SELECT ' + fields + ' FROM ' + options.table + ' WHERE id = ' + options.id;

    	console.log((global.config.server.debug) ? sql : null);

    	connection.query(sql, callback);
	    connection.end();
    }
};