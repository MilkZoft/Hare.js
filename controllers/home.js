/**
 * Home
 */

module.exports = {
    index: function(req, res, params, lang)
    { 
    	res.send(global.lang.global['welcome']);
    }
};