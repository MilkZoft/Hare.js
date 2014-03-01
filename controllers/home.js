/**
 * Home
 */

module.exports = {
    index: function(req, res, params, lang)
    { 
    	res.send(lang.translate.global['welcome']);
    }
};