var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		//You'll need to configure mongo dev
		db: 'mongodb://localhost/dev',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},
	production: {
		//You'll need to configure mongo prod
		db: 'mongodb://localhost/production',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
}