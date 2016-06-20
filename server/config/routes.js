var auth = require('./auth'),
	users = require('../controllers/users'),
	driverData = require('../controllers/driver_data'),
	emails = require('../controllers/emails'),
	geo = require('../controllers/geo'),
	graphs = require('../controllers/graphs'),
	groceries = require('../controllers/groceries'),
	messaging = require('../controllers/messaging'),
	orders = require('../controllers/orders'),
	payments = require('../controllers/payments'),
	stores = require('../controllers/stores'),
	mongoose = require('mongoose');

module.exports = function(app) {

	//users
	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
	app.post('/api/users', users.createUser);
	app.put('/api/users', users.updateUser);
	app.post('/load_user', users.loadUser);

	//driverdata
	app.post('/api/driver/get/jobs/userid/', driverData.getDriverJobsByUserID);
	app.post('/api/driver/get/jobs/customerid/', driverData.getDriverJobsByDeliveryTargetUserID);
	app.post('/api/driver/get/jobs/status/', driverData.getDriverJobsByStatus);
	app.post('/api/driver/get/jobs', driverData.getDriverJobs);
	app.post('/api/driver/create/job', driverData.createDriverJob);
	app.post('/api/driver/update/job', driverData.updateDriverJobByDriverJobID);
	app.post('/api/driver/get/ratings/userid', driverData.getDriverRatingsByUserID);
	app.post('/api/driver/get/ratings/jobid', driverData.updateDriverJobByDriverJobID);
	app.post('/api/driver/get/ratings/customerid', driverData.getDriverRatingsByDeliveryTargetUserID);
	app.post('/api/driver/get/ratings', driverData.getDriverRatings);
	app.post('/api/driver/get/ratings/aggregate/userid', driverData.getDriverRatingsAggregateByUserID);
	app.post('/api/driver/get/ratings/aggregate', driverData.getDriverRatingsAggregate);
	app.post('/api/driver/create/rating', driverData.createDriverRating);
	app.post('/api/driver/update/rating', driverData.updateDriverRatingByRatingID);

	//email
	app.post('/api/email/sendmessage', emails.sendMessage);

	//geo
	app.post('/api/geo/getCitiesByState', geo.getCitiesByState);
	app.post('/api/geo/getStates', geo.getStates);
	// app.post('/api/geo/getStates', geo.getStates);

	//graph
	app.post('/api/driver/get/performance_graph', graphs.getGraphForDriver);

	//groceries
	app.post('/api/groceries/get/id', groceries.getGroceryById);
	app.post('/api/groceries/get/pricecheck', groceries.getGroceryPriceById);
	app.post('/api/groceries/get/query', groceries.getGroceriesByQuery);
	app.post('/api/groceries/get/upc', groceries.getGroceryByUPC);
	app.post('/api/groceries/get/name', groceries.getGroceriesByProductName);

	//messaging
	app.post('/api/messages/send', messaging.sendMessage);

	//orders
	app.post('/api/orders/get/orderid', orders.getOrderByID);
	app.post('/api/orders/get/status', orders.getOrdersByStatus);
	app.post('/api/orders/get/customerid', orders.getUserOrders);
	app.post('/api/orders/check/permission', orders.getUserOrderPermission);
	app.post('/api/orders/update/orderid', orders.updateOrderByID);
	app.post('/api/orders/create', orders.createOrder);

	//payments
	app.post('/api/payments/set/cc_new/', payments.processCCPayment);
	app.post('/api/payments/set/cc_existing/', payments.processExistingCCPayment);
	app.post('/api/payments/delete/cc_existing/', payments.deleteCC);
	app.post('/api/payments/set/paypal/', payments.logPayPalOrder);

	//stores
	app.post('/api/stores/get/name', stores.getStoreByName);
	app.post('/api/stores/get/citystate', stores.getStoreByCityState);
	app.post('/api/stores/get/postal', stores.getStoreByPostal);
	app.post('/api/stores/set/user_store', stores.saveUserStore);

	//frontend
	app.get('/partials/*', function(req, res) {
		res.render('../../public/app/' + req.params);
	});

	//login
	app.post('/login', auth.authenticate);
	app.post('/logout', function(req, res) {
		req.logout();
		res.end();
	});

	app.get('*', function(req, res) {
		res.render('index');
	}); //any and all requests will get index page 
}
