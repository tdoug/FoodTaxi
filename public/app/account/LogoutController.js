angular.module('app')

.controller('LogoutController', 
	function($scope, $http, $location, Identity, User, Notifier, Auth, storage) {
	storage.set('logged_in_user', '');
	Identity.currentUser = undefined;
	Notifier.notify('You have been logged out.');
	$location.path('/');
});