/**
 * Home
 */

var input = require('../system/helpers/input');

module.exports = {
  index: function(params)
  {
    if (input.isPost()) {
      if (!input.has('password')) {
        console.log('Falta el password');
      }

      var data = input.except('email');

      console.log(data.password);
    }

    global.res.render('home/index');
  }
};