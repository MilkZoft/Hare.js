var self = {
  set: function(options)
  {
    if (typeof (options) == 'string') {
      if (global.config.server.debug) {
        global.res.render('debug/error', { message: options });
      }
    } else {
      var debugLines = (options.l) ? + options.l : '';
      var debugFunction = (options.f) ? 'function:' + options.f : null;

      if (options.s) {
        var debugMessage = options.file + ':' + options.l + '|' + debugFunction + '|Sql:' + options.s;
      } else {
        var debugParams = (options.p) ? options.p : null;
        var debugReturn = (options.r) ? '|Return: ' + options.r : '';
        var debugMessage = options.file + ':' + options.l + '|' + debugFunction + '(' + debugParams + ')' + debugReturn; 
      }
    }  
     
    if (global.config.server.debug) {
      console.log(debugMessage);
    }
  }
};

module.exports = self;