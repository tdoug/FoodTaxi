var mongoose = require('mongoose'),
	encrypt = require('../utilities/encryption');

/* TODO provide list of phones to use for select box/database */
var userSchema = mongoose.Schema({
	firstName: {type:String, required: 'Your First Name is required'},
	lastName: {type:String, required: 'Last Name is required'},
	email: {type: String, required: 'E-mail is required', unique:true },
	cell: {type: String, required: 'Your cell phone number is required' },
	address: {type: String },
	address_2: {type: String },
	city: {type: String, required: 'City is required' },
	state: {type: String, required: 'State is required' },
	postal_code: {type: String },
	phone_type: {type: String },
	salt: {type:String, required: 'A password is required'},
	hashedPW: {type:String, required: 'A password is required'},
	braintreeCustomerID: {type:String},
	braintreeCCToken: {type:String},
	roles: [String]
});
userSchema.methods= {
	authenticate: function(passToMatch) {
		return encrypt.hashPass(this.salt, passToMatch) === this.hashedPW;
	},
	hasRole: function(roleToMatch) {
		return this.roles.indexOf(role) > -1;
	}
}
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
	User.find({}).exec(function(err, collection) {
		if (collection.length === 0) {
			var salt, hash;
			salt = encrypt.createSalt();
			hash = encrypt.hashPass(salt, 'admin');
			User.create({firstName:'App',lastName:'Admin',email:'admin@foodtaxi.com', state:'TX', city:'Austin', cell:'555-555-5555',salt: salt, hashedPW: hash, roles: 'admin'},function(err, user) {
				console.log(err);
			});	
			console.log('Default users created');
		}
	})
};

exports.createDefaultUsers = createDefaultUsers;