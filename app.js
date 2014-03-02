/**
 * Module dependencies.
 */
var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express();

require('./system/functions');

// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Global variables
global.config = require('./config/config');
global.debug = require('./system/helpers/debug');
global.i18n = require('./system/helpers/i18n');
global.str = require('./system/helpers/string');

app.locals = global.config;

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Development only
if (app.get('env') == 'development') {
  app.use(express.errorHandler());
}

/**
 * Router
 */
app.use(function(req, res, next) {
  global.req = req;
  global.res = res;
  
  // Loading the default language until a different language is specified through the url.
  global.lang = require('./languages/' + global.config.site.language);

  var path = req.url.replace(/^\/|\/$/g, ''),
      url = (path) ? path.split('/') : false,
      params = [];

  // Default controller is defined in global.config.application.controllers.default
  if (!url) {
    var execute = require('./controllers/' + global.config.application.controllers.default);

    execute.index(req, res, [], lang);
  } else {
    if (global.i18n.isLanguage(url[0])) {
      var controller = url[1];
      var action = (url[2]) ? url[2] : 'index';

      global.lang = require('./languages/' + url[0]);

      if (url.length == 1) {
        var execute = require('./controllers/' + global.config.application.controllers.default);

        execute.index(req, res, []);
      }

      var j = (url.length > 3) ? 3 : 2;
    } else {
      var controller = url[0];
      var action = (url[1]) ? url[1] : 'index';
      var j = 2;
    }

    if (url.length > 2) {
      for (var i = j; i <= url.length; i++) {
        if (url[i]) {
          params.push(global.str.sanitize(url[i]));
        }
      }
    }

    try {
      var execute = require('./controllers/' + controller);

      execute[action](req, res, params);
    } catch(e) {
      console.log("---ERROR FATAL---", e);

      var execute = require('./controllers/error');

      execute.error404(req, res, []);
    }
  }
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Running on port ' + app.get('port'));
});