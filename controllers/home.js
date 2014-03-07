/**
 * Home
 */
var input = require('../system/helpers/input'),
    date  = require('../system/helpers/date');

module.exports = {
  index: function(params)
  {
    if (input.isPost()) {
      if (!input.has('password')) {
        console.log('Falta el password');
      }

      console.log(date.day());
      console.log(date.month());
    }

    global.res.render('home/index');
  }
};