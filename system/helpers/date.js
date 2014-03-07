var self = {
  day: function()
  {
    return global.lang.date.d[new Date().getDay()];
  },

  month: function() 
  { 
    return global.lang.date.m[new Date().getMonth()];
  }
};

module.exports = self;