/*
 * GET users.
 */
var globals = require('../config/config'),
	db = require('../db/mysql');

module.exports = {
    index: function(req, res, params)
    { 
    	res.send('Index');
    },

    get: function(req, res, params)
    {
    	db.find({id: 1, table: 'users', fields: '*'}, function(error, data) {
    		res.render('users_user', { users: data });
    	});
    },
    
    login: function(req, res, params)
    { 
    	console.log("Login", params);
    }
};