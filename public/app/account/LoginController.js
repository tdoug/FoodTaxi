/* TODO expand to conform to client spec */

angular.module('app')

.controller('LoginController',  ['$rootScope' ,'$scope', '$http', 'Notifier', 'Identity', 'Auth', '$location', function ($rootScope, $scope, $http, Notifier, Identity, Auth, $location) {
	$rootScope.fromsignin = false;
	$scope.attempts = 0;
	$scope.identity = Identity;
	$scope.signin = function(username, password) {
		Auth.authenticateUser(username, password).then(function(success) {
			if(success) {
				Notifier.notify('You have successfully signed in');
				if(username === 'admin@foodtaxi.com')									
					$location.path('/admin/users');				
				else				
					$location.path('/main');				
			} else {
				$scope.attempts+=1;
				$scope.$broadcast('flashNotification::message', 'Sorry, but we could not find an account with the supplied credentials.  Please try again.');
				if ($scope.attempts == 5) {
					$rootScope.fromsignin = true;
					$location.path('/register');
				}

			}
		});
	};

	$scope.goBack = function() { 
		window.history.back();
	};
}])

.directive('flashNotification', function($animate, $timeout) {
	var flashNotification = {
		restrict: 'E',
	 	scope: {},
	 	link: function postLink(scope, iElement, iAttrs) {
	 		scope.$on('flashNotification::message', function(e, message) {
	 			var messageElement = angular.element('<div class="flash-notification-message"></div>');
	 			messageElement.text(message);
	 			iElement.append(messageElement);
	 			$timeout(function() {
	 				$animate.leave(messageElement);
	 			},500); //time limit
	 		});
	 	}
	 };
	 return flashNotification;
});