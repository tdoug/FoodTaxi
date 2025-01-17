var mongoose = require('mongoose'),
	userModel = require('../models/User'),
	storeModel = require('../models/stores'),
	ordersModel = require('../models/Orders'),
	orderPaymentsModel = require('../models/Orders_Payments');

module.exports = function(config) {

	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log('Database opened successfully.');
	});

	userModel.createDefaultUsers();
	storeModel.createTestingStore();
};

