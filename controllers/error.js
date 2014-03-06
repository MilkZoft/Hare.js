/*
 * Home
 */

module.exports = {
  error404: function(params)
  {
    global.res.send(global.lang.errors['404']);
  }
};