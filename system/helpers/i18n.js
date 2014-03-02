var self = {
  isLanguage: function(language) 
  {       
    if (global.config.application.languages.inArray(language)) {
      global.debug.set({ 
        file: 'helpers/i18n.js', 
        l: 10, 
        f: 'isLanguage', 
        p: 'language=' + language,
        r: true
      });

      return true;
    }

    return false;
  }
};

module.exports = self;