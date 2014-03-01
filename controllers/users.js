/*
 * GET users.
 */
var globals = require('../config/config'),
	db = require('../db/mysql');

module.exports = {
    index: function(req, res, params, lang)
    { 
    	res.send(lang.translate['hello.world']);
    },

    get: function(req, res, params, lang)
    {
    	db.find({id: 1, table: 'users', fields: '*'}, function(error, data) {
    		res.render('users_user', { users: data });
    	});
    },
    
    login: function(req, res, params, lang)
    { 
    	res.send(lang.translate.users['logout']);
    }
};