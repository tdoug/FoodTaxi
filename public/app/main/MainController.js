/* TODO Provide interface matching client expectation
*/

angular.module('app')

.controller('MainController', ['$scope', '$location', 'Identity', function($scope, $location, Identity) {
	$scope.toRegister = function() {
		$location.path('/register');
	};

	$scope.toSignin = function() {
		$location.path('/signin');
	};

	if(Identity.currentUser != undefined)
	{
		$location.path('/main');
	}
}]);