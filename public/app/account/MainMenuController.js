/* TODO Provide interface matching client expectation
*/

angular.module('app')

.controller('MainMenuController', ['$scope', '$location', function($scope, $location, Auth, Identity, Notifier) {
	$scope.goBack = function() { 
		window.history.back();
	};
}]);