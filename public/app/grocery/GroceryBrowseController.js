///TODO provide the aisle/search views for grocery browsing, include search

angular.module('app')

.controller('GroceryBrowseController', function($scope, $http, $location, User, Notifier, Auth) {
	
	$scope.goBack = function() { 
		window.history.back();
	};

	$scope.addToCart = function()
	{
		Notifier.notify('An item was added to your cart');
	};

	$scope.keydown = function() {
        if($scope.search_query.length < 3)
        {
			$scope.items = {};
        }
        else
        {
			/* TODO change store_id to Identity.currentUser.storeID
			after setting store functionality is completed
			*/
			$http({
				method:'POST',
				url:'/api/groceries/get/query',
				data:{ query:$scope.search_query, store_id:'beb8c4169b' }
				}
				).success(function(data, status, headers, config) {
					if(data.failure != 1)
					{
						$scope.items = data;
					}
				}).
				error(function(data, status, headers, config) {
  
				});
        }
   };

   
});