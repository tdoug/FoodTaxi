angular.module('app')

.factory('Identity', function(storage, User) {
	var logged_in_user = storage.get('logged_in_user');
	
	if(typeof(logged_in_user) == 'object') {
		currentUser = new User();
		angular.extend(currentUser, logged_in_user);
	}
	else
		currentUser = undefined;
	return {
		currentUser: currentUser,
		isAuthenticated: function() {
			return !!this.currentUser;
		},
		isAuthorized: function(role) {
			return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
		},
	};
});