var xmlparse = require('xmldoc');
var restler = require('restler');
var SMAPI_key = '50cdd99efb';

////supermarket API key : 50cdd99efb 
////SMAPI docs: http://www.supermarketapi.com/Methods_v1.aspx

///TODO return cities within requested US state
///FORMAT: json
exports.getCitiesByState = function(req, res) {
	
	var state = req.body.state, city_loop = {};
	var smapi_url = 'http://www.SupermarketAPI.com/api.asmx/CitiesByState?APIKEY='+SMAPI_key+'&SelectedState='+state;
	restler.get(smapi_url).on('complete', function(data) {
			var SMAPI_response = new xmlparse.XmlDocument(data);
			var cities = SMAPI_response.eachChild(function(child, index, array)
			{
				child.children.forEach(function(x,i){
					if(x.name == 'City')
					{
						city_loop[x.val] = x.val;
					}
				});
			});
			res.send(city_loop);
		});
};

///TODO returns all US states available to Supermarket API
///FORMAT: json
exports.getStates = function(req, res) {
	var states = {};
	var smapi_url = 'http://www.SupermarketAPI.com/api.asmx/AllUSStates';
	restler.get(smapi_url).on('complete', function(data) {
		var SMAPI_response = new xmlparse.XmlDocument(data);
		var temp = SMAPI_response.eachChild(function(child, index, array) {
			child.children.forEach(function(x,i) {
				if(x.name == 'State') {
					states[x.val] = x.val;
				}
			});
		});
		res.send(states);
	})
};