var xmlparse = require('xmldoc');
var restler = require('restler');
var SMAPI_key = '50cdd99efb';
var Store = require('mongoose').model('stores');
var User = require('mongoose').model('User');

///TESTING
///TODO provide backend admin interface to add/delete supported stores
var testing_store_id = "beb8c4169b";

////SMAPI docs: http://www.supermarketapi.com/Methods_v1.aspx


exports.saveUserStore = function(req,res)
{
	User.findOne({ _id: req.body.uid }, function (err, doc)
	{
		if(!err)
		{
			doc.selected_store_id = req.body.store_id;
			doc.save();
			res.send({success:1});
		}
		else
			throw err;
	});
};

///TODO return listings of store search by name
///FORMAT: json
exports.getStoreByName = function(req, res) {

};

///TODO return listings of store search by city/state combo
///FORMAT: json
exports.getStoreByCityState = function(req, res) {

};

exports.getStoreByPostal = function(req, res) {
	var zip = req.body.zip, store_loop = [], local_stores = new Object();
	var smapi_url = "http://www.SupermarketAPI.com/api.asmx/StoresByZip?APIKEY="+SMAPI_key+"&ZipCode="+zip;		
	
	restler.get(smapi_url).on('complete', function(data) {
			var SMAPI_response = new xmlparse.XmlDocument(data);			
			var items = SMAPI_response.childrenNamed('Store');	
				
			Store.find({},function(err, local_stores) {
				items.forEach(function(x,y){
					var store = new Object();
					
					for(var i = 0; i < x.children.length; i++)
					{					
						store[x.children[i].name] = x.children[i].val;					
					}
					///find if any stores within the zipcode are supported by the service
					for(var b = 0; b < local_stores.length; b++) 
					{	
						if(local_stores[b].storeId == store['StoreId']);
							store_loop[y] = store;
					}				
				});
				
				res.send(store_loop);					
			});
	});
};