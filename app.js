/**
 * Module dependencies.
 */
var express = require('express'),
	http 	= require('http'),
	path 	= require('path'),
	global  = require('./config/config'),
	app 	= express();

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

app.use(function(req, res, next) {
	var path = req.url.replace(/^\/|\/$/g, ''),
		url  = (path) ? path.split('/') : 'home';
	
	if (url == 'home') {
		var execute = require('./controllers/home');

		execute.index(req, res);
	} else {
		var controller = url[0];
		var action = (url[1]) ? url[1] : 'index';
		var params = [];

		if (url.length > 2) {
			for (var i = 2; i <= url.length; i++) {
				if (url[i]) {
					params.push(url[i]);
				}
			}
		}
		console.log(action);
		
		try {
			var execute = require('./controllers/' + controller);

			execute[action](req, res, params);
		} catch(e) {
			console.log(e);
			var execute = require('./controllers/error');

			execute.error404(req, res);
		}			
	}
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Running on port ' + app.get('port'));
});