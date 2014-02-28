/*
 * Home
 */

module.exports = {
    error404: function(req, res, lang)
    { 
    	res.send(lang.translate.errors['404']);
    }
};