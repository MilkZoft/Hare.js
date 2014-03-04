/**
 * Home
 */

module.exports = {
  index: function(req, res, params)
  {
    if (req.method == 'POST') {
      console.log('RECIBIENDO EL POST', req.body);
    }
    res.render('home/index');
  }
};