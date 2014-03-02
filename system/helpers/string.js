var self = {
  escape: function (str) 
  {       
    return str.replace(/'/g, "\\'");
  },

  sanitize: function (str)
  {
    return str.replace(/'/g, '');
  }
};

module.exports = self;