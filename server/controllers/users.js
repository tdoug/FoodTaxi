var User = require('mongoose').model('User'),
	encrypt = require('../utilities/encryption');

exports.getUsers = function(req, res) {
	User.find({}).exec(function(err, collection) {
		res.send(collection);
	})
};

exports.loadUser = function(req, res)
{
	var response_msg = {};

	User.findOne({email:req.body.email}).exec(function(err, doc)
	{
		if(!err)
		{
			response_msg.user = doc;
			res.send(response_msg);
		}
		else
			throw err;
	});
};


exports.createUser = function(req, res, next) {
	var userData = req.body;
	userData.salt = encrypt.createSalt();
	userData.hashedPW = encrypt.hashPass(userData.salt, userData.password);
	User.create(userData, function(err, user) {
		if(err) {
			console.log(err);
			if(err.toString().indexOf('E11000') > -1) {
				err = new Error('Duplicate E-mail Found.  Please use a correct e-mail address.');
			}
			res.status(400);
			return res.send({reason:err.toString()});
		}
		req.logIn(user, function(err) {
			if(err) {
				return next(err);
			}
			res.send(user);
		})
	})
};

exports.updateUser = function(req, res) {
	var userUpdates = req.body;

	if(req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
		res.status(403);
		return res.end();
	}

	req.user.firstName = userUpdates.firstName;
	req.user.lastName = userUpdates.lastName;
	if(userUpdates.password && userUpdates.password.length > 0) {
		req.user.salt = encrypt.createSalt();
		req.user.hashedPW = encrypt.hashPass(req.user.salt, userUpdates.password)
	}
	req.user.save(function (err) {
		if(err) {
			res.status(400);
			return res.send({reason:err.toString()});
		}
		res.send(req.user);
	})
};

///TODO returns user email address given a user ID
///FORMAT: JSON
///NOTES: Only use if persistent user object is not available
exports.getUserEmail = function(req, res) {

};