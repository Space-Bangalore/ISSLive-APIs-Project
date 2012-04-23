var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');
var fs = require('fs');

exports.Application = function(port) {
	var app = express.createServer();

	app.configure(function() {
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser());
		app.use(express.session({secret: config.sessionsecret}));
		app.use(app.router);
//		app.use(express.static(__dirname + '/public'));
	});

	app.configure('development', function() {
		app.use(express.logger(':method :url :status'));
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
	});

	app.configure('production', function() {
		app.use(express.errorHandler()); 
	});

	mongoose.connect(config.mongoUrl);

	fs.readdir(__dirname + '/controllers', function(err, files) {
		if(err) throw err;
		files.forEach(function(file) {
			var name = file.replace('.js', '');
			var Controller = require('./controllers/' + name);
			var controller = new Controller(mongoose);
			controller.actions.forEach(function(action) {
				app[action.method]('/' + name + '/' + action.path, action.handler);
			});
		});
	});

	this.start = function() {
		app.listen(port);
		console.log("Express started on port %d in %s mode", app.address().port, app.settings.env);
	};
}
