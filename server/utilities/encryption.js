crypto = require('crypto');

exports.createSalt = function() {
	return crypto.randomBytes(128).toString('base64');
}

exports.hashPass = function(salt, pw) {
	var hmac = crypto.createHmac('sha1', salt); //hash message authentication code (hmac)
	return hmac.update(pw).digest('hex');
}