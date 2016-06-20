var xmlparse = require('xmldoc');
var restler = require('restler');
var SMAPI_key = '50cdd99efb';

////SMAPI docs: http://www.supermarketapi.com/Methods_v1.aspx

////FORMAT:json
exports.getGroceryById = function(req, res) {
	var item_id = req.body.this_id;
	var smapi_url = "http://www.SupermarketAPI.com/api.asmx/COMMERCIAL_SearchByItemID?APIKEY="+SMAPI_key+"&ItemId="+item_id;
	restler.get(smapi_url).on('complete', function(data) {
		var SMAPI_response = new xmlparse.XmlDocument(data);
		var items = SMAPI_response.childrenNamed('Product_Commercial');
		items.forEach(function(x,y){
				var item = new Object();
				for(var i = 0; i < x.children.length; i++)
				{					
					item[x.children[i].name] = x.children[i].val;
				}				
			});			
			res.send(item);
		});
};

exports.getGroceryPriceById = function(req, res) {
	var item_id = req.body.this_id, price = req.body.this_price, failure, response_msg = {}, item = [], item_loop = [];
	var smapi_url = "http://www.SupermarketAPI.com/api.asmx/COMMERCIAL_SearchByItemID?APIKEY="+SMAPI_key+"&ItemId="+item_id;
	console.log(smapi_url);
	restler.get(smapi_url).on('complete', function(data) {
		var SMAPI_response = new xmlparse.XmlDocument(data);
		var items = SMAPI_response.childrenNamed('Product_Commercial');
		items.forEach(function(x,y)
		{				
				for(var i = 0; i < x.children.length; i++)
				{
					if(x.children[i].name == "Pricing")
					{
						if(parseInt(x.children[i].val) == parseInt(price))
						{
							response_msg.success = 1;
							response_msg.price = price;
							res.send(response_msg);		
						}
					}
				}
			});	
			
			if(response_msg.success != 1)
			{
				response_msg.falure = 1
				res.send(response_msg);
			}
		});
};

///FORMAT: json
exports.getGroceriesByQuery = function(req, res) {
	var query = req.body.query, item_loop = [];
	var store_id = req.body.store_id;
	var smapi_url = "http://www.SupermarketAPI.com/api.asmx/COMMERCIAL_SearchForItem?APIKEY="+SMAPI_key+"&StoreId="+store_id+"&ItemName="+query;
	console.log(smapi_url);
	restler.get(smapi_url).on('complete', function(data) {
			var SMAPI_response = new xmlparse.XmlDocument(data);
			var items = SMAPI_response.childrenNamed('Product_Commercial');
				
			items.forEach(function(x,y){
				var item = {};
				if(typeof(x.children) != 'object')
				{
					item.failure = 1;
					res.send(item);
				}

				for(var i = 0; i < x.children.length; i++)
				{
					if(x.children[i].name == "Itemname" &&
						x.children[i].val.length > 45)
					{
						item[x.children[i].name] = x.children[i].val.substring(0, 45) + "...";
					}
					else
						item[x.children[i].name] = x.children[i].val;
				}
				//console.log(item);
				if(item.Itemname.length > 3 && item.Itemname != "NONAME") // filter bad results
				item_loop[y] = item;
			});
			//console.log(item_loop);
			res.send(item_loop);
	});
};

/* TODO return with data object of grocery specified by SKU number from a scanned UPC
barcode */
///FORMAT: json
exports.getGroceryByUPC = function(req, res) {

};

///TODO return with data object of grocery specified by product name
///FORMAT: json
exports.getGroceriesByProductName = function(req, res) {

};