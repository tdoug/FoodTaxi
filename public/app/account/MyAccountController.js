angular.module('app')

.controller('MyAccountController', ['$scope', '$location', function($scope, $location, Auth, Identity, Notifier) {
	$scope.goBack = function() { 
		window.history.back();
	};
}]);