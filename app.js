/**
 * Module dependencies.
 */
var express = require('express'),
	http = require('http'),
	path = require('path'),
	global = require('./config/config'),	
	app = express();

// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Global variables for templates
app.locals = global;

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

function isLanguage(language)
{
	if (language == 'es' || 
		language == 'en' ||
		language == 'fr' ||
		language == 'pt' ||
		language == 'it' ||
		language == 'ge' ||
		language == 'ch'
		) {
		return true;
	}

	return false;
}

/**
 * Router
 */
app.use(function(req, res, next) {
	// Loading the default language until a different language is specified through the url.
	var lang = require('./languages/' + global.config.site.language);

	var path = req.url.replace(/^\/|\/$/g, ''),
		url  = (path) ? path.split('/') : false,
		params = [];

	// Default controller is defined in global.config.application.controllers.default
	if (!url) {
		var execute = require('./controllers/' + global.config.application.controllers.default);

		execute.index(req, res, [], lang);
	} else {
		var controller = (url[0] == 'es' || url[0] == 'en') ? url[1] : url[0];

		if (isLanguage(url[0]) && url.length == 1) {
			lang = require('./languages/' + url[0]);

			var execute = require('./controllers/' + global.config.application.controllers.default);

			execute.index(req, res, [], lang);
		} else if (isLanguage(url[0])) {
			var action = (url[2]) ? url[2] : 'index';

			lang = require('./languages/' + url[0]);
		} else  {
			var action = (url[1]) ? url[1] : 'index';
		}

		if (url.length > 3 && isLanguage(url[0])) {
			for (var i = 3; i <= url.length; i++) {
				if (url[i]) {
					params.push(url[i]);
				}
			}
		} else if (url.length > 2) {
			for (var i = 2; i <= url.length; i++) {
				if (url[i]) {
					params.push(url[i]);
				}
			}
		}

		try {
			var execute = require('./controllers/' + controller);

			execute[action](req, res, params, lang);
		} catch(e) {
			var execute = require('./controllers/error');

			execute.error404(req, res, [], lang);
		}
	}
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Running on port ' + app.get('port'));
});