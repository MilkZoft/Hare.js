var self = {
  get: function(field) 
  {       
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
  }

};

module.exports = self;