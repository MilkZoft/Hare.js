/*
 * Home
 */

module.exports = {
    error404: function(req, res, params, lang)
    { 
    	res.send(lang.translate.errors['404']);
    }
};