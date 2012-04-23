var Sensor = require('../models/sensor');

module.exports = function(mongoose) {
	var sensor = new Sensor(mongoose);

	var list = function(req, res) {
		if(req.param('format') == 'xml') {
			// Yet to implement
		} else {
			res.json({code: 1});
		}
	};

	var get = function(req, res) {
		if(req.param('format') == 'xml') {
			// Yet to implement
		} else {
			res.json({code: 1});
		}
	};

	this.actions = [
		{method: 'get', path: 'list', handler: list},
		{method: 'get', path: 'get', handler: get}
	];
}