var self = {
  all: function()
  {
    return (global.req.body) ? global.req.body : false;
  },

  except: function(options)
  {
    if (typeof(options) === 'string') {
      options = options.replace(/\s/g, '').split(',');
    } else if (typeof(options) === 'undefined') {
      return false;
    } else if (typeof(global.req.body) === 'undefined') {
      return false;
    }

    var count = options.length - 1;

    for (var i = 0; i <= count; i++) {
      if (global.req.body[options[i]]) {
        delete global.req.body[options[i]];
      } 
    }

    return global.req.body;
  },

  get: function(field, value) 
  {       
    if (value) {
      return (global.req.body[field]) ? global.req.body[field] : value;  
    }

    return (global.req.body[field]) ? global.req.body[field] : false;
  },

  has: function(field) 
  {       
    return (global.req.body[field]) ? true : false;
  },

  isGet: function()
  {
    return (global.req.method == 'GET') ? true : false;
  },

  isPost: function()
  {
    return (global.req.method == 'POST') ? true : false;
  },

  only: function(options)
  {
    if (typeof(options) === 'string') {
      options = options.replace(/\s/g, '').split(',');
    } else if(typeof(options) === 'undefined') {
      return false;
    }

    var values = {},
        count = options.length - 1;

    for (var i = 0; i <= count; i++) {
      if (global.req.body[options[i]]) {
        values[options[i]] = global.req.body[options[i]];
      } else {
        values[options[i]] = false;
      }
    }

    return values;
  }
};

module.exports = self;