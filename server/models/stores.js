var mongoose = require('mongoose');

var storeSchema = mongoose.Schema({
	storeId: {type:String, required:"A store ID is required."}
});

var Store = mongoose.model('stores', storeSchema);

///TESTING creates a default 'store'
function createTestingStore()
{
	Store.find({}).exec(function(err, collection) {
		if (collection.length === 0) {
			
			Store.create({storeId: 'beb8c4169b'},function(err, user) {
				console.log(err);
			});	
			console.log('Default store created.');
		}
	})
}

exports.createTestingStore = createTestingStore;
