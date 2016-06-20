angular.module('app')

.factory('Auth', function($http, Identity, storage, $q, User) {
	return {
		authenticateUser: function(username, password) {
			var defPromise = $q.defer();
			$http.post('/login', {username:username, password:password}).then(function(response) {
				if(response.data.success) {
					var user = new User();
					angular.extend(user, response.data.user);
					Identity.currentUser = user;
					storage.set('logged_in_user',user);
					defPromise.resolve(true);
				} else {
					defPromise.resolve(false);
				}
			});
			return defPromise.promise;
		},

		updateCurrentUser: function(newUserData) {
			var defPromise = $q.defer();

			var clone = angular.copy(Identity.currentUser);
			angular.extend(clone, newUserData);
			clone.$update().then(function() {
				Identity.currentUser = clone;
				storage.set('logged_in_user',clone);
				defPromise.resolve();
			}, function(response) {
				defPromise.reject(response.data.reason);
			});
			return defPromise.promise;
		},
		///refreshes user objects straight from DB
		refreshUser: function(email) 
		{
			$http.post('/load_user', {email:email}).success(function(data, status, headers, config) {
				if(typeof data.user === 'object')
				{
					var user = new User();
					angular.extend(user, data.user);
					this.currentUser = user;
					storage.set('logged_in_user',user);
					console.log('user_refreshed');
				}
				else
					return false;
			});
		},

		createUser: function(newUserData) {
			var newUser = new User(newUserData);
			var defPromise = $q.defer();

			newUser.$save().then(function() {
				Identity.currentUser = newUser;
				defPromise.resolve();
			}, function(response) {
				defPromise.reject(response.data.reason);
			});

			return defPromise.promise;
		},

		logoutUser: function() {
			var defPromise = $q.defer();
			$http.post('/logout', {logout:true}).then(function() {
				Identity.currentUser = undefined;
				defPromise.resolve();
			});
			return defPromise.promise;
		},

		authorizeCurrentUserForRoute: function(role) {
			if (Identity.isAuthorized('admin')) {
				return true;
			} else {
				return $q.reject('not authorized');
			}
		},

		authorizeAuthenticatedUserForRoute: function() {
			if(Identity.isAuthenticated()) {
				return true;
			} else {
				return $q.reject('not authenticated');
			}
		}
	}
})