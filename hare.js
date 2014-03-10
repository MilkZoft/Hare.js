/**
 * Module dependencies.
 */
var express = require('express'),
    http = require('http'),
    path = require('path'),
    hare = express();

require('./system/prototype');

// Global variables
global.config = require('./config/config');
global.debug = require('./system/helpers/debug');
global.i18n = require('./system/helpers/i18n');

// All environments
hare.set('port', process.env.PORT || 3000);
hare.set('views', path.join(__dirname, 'views'));
hare.set('view engine', global.config.site.html.engine);

hare.locals = global.config;
hare.locals.pretty = !global.config.site.html.minify;

hare.use(express.logger('dev'));
hare.use(express.json());
hare.use(express.urlencoded());
hare.use(express.methodOverride());
hare.use(hare.router);
hare.use(express.static(path.join(__dirname, 'public')));
hare.use(express.favicon(path.join(__dirname, 'public/themes/' + global.config.site.theme + '/images/favicon.ico')));

// Development only
if (hare.get('env') == 'development') {
  hare.use(express.errorHandler());
}

/**
 * Router
 */
hare.use(function(req, res, next) {
  global.req = req;
  global.res = res;

  // Loading the default language until a different language is specified through the url.
  global.lang = require('./languages/' + global.config.site.language);

  var path = req.url.replace(/^\/|\/$/g, ''),
      url = (path) ? path.split('/') : false,
      params = [],
      start = 2,
      controller = (url[0]) ? url[0] : global.config.application.controllers.default,
      action = (url[1]) ? url[1] : 'index',
      segments = (url) ? url.length : 0,
      exe = false;

  hare.locals.currentLanguage = global.config.site.language;

  // Default controller is defined in global.config.application.controllers.default
  if (!url) {
    exe = require('./controllers/' + controller);
    exe.index();
  } else {
    if (global.i18n.isLanguage(url[0])) {
      controller = url[1];
      action = (url[2]) ? url[2] : 'index';

      global.lang = require('./languages/' + url[0]);
      hare.locals.currentLanguage = url[0];

      start = (segments > 3) ? 3 : 2;
    }

    if (segments == 1) {
      exe = require('./controllers/' + global.config.application.controllers.default);
      exe.index();
    } else {
      if (segments > 2) {
        for (var i = start; i <= segments; i++) {
          if (url[i]) {
            params.push(url[i].sanitize());
          }
        }
      }

      try {
        if (!global.config.server.files.filter.inArray(controller)) {
          exe = require('./controllers/' + controller);
          exe[action](params);
        }
      } catch(e) {
        console.log("---ERROR FATAL---", e);
        exe = require('./controllers/error');
        exe.error404();
      }
    }
  }
});

http.createServer(hare).listen(hare.get('port'), function () {
  console.log('Running on port ' + hare.get('port'));
});