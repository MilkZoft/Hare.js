/**
 * Home
 */

module.exports = {
  index: function(req, res, params)
  {
    res.send(global.lang.global['welcome']);
  }
};