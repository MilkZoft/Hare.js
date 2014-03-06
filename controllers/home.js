/**
 * Home
 */

var input = require('../system/helpers/input');

module.exports = {
  index: function(req, res, params)
  {
    if (input.isPost()) {
      if (!input.has('password')) {
        console.log('Falta el password');
      }

      var data = input.except('email');

      console.log(data.password);
    }

    res.render('home/index');
  }
};