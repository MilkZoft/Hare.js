/*
 * Home
 */

module.exports = {
  error404: function(req, res, params)
  {
    res.send(global.lang.errors['404']);
  }
};