angular.module('app')

.controller('StoreFinderController', function($scope, $http, $location, Identity, User, Notifier, Auth, storage) {
	$scope.goBack = function() {
		window.history.back();
	};

	$scope.findStore = function(req, res) {
		$http({
				method:'POST',
				url:'/api/stores/get/postal',
				data:{ zip:$scope.zip }
				}
				).success(function(data, status, headers, config) {
					if(data.length > 1)
					{
						$scope.stores = data;
					}
					else
					{
						$location.path('/areanotserviced');
					}
				}).
				error(function(data, status, headers, config) {
  
				});
	};

	$scope.saveStore = function(selected_store)
	{
		var user_id = Identity.currentUser._id;
		var logged_in_user = storage.get('logged_in_user');

		//console.log(selected_store);
		//console.log(user_id);
		$http({
				method:'POST',
				url:'/api/stores/set/user_store',
				data:{ uid:user_id, store_id:selected_store }
				}
				).success(function(data, status, headers, config) {
					if(data.success == 1)
					{
						Identity.currentUser.selected_store_id = selected_store;
						logged_in_user.selected_store_id = selected_store;
						storage.set('logged_in_user', logged_in_user);
						Notifier.notify('You have selected this store.');
						$location.path('/main');
					}
				}).
				error(function(data, status, headers, config) {
  						Notifier.notify('An error occured selecting this store.');
				});
	};
});