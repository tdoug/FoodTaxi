/* TODO provide switch for both driver and customer profiles, change data fields, 
provide driver performance graph */

angular.module('app').controller('ProfileController', function($scope, Auth, Identity, Notifier)
{
	///TODO add postal code
	$scope.email = Identity.currentUser.email;
	$scope.fname = Identity.currentUser.firstName;
	$scope.lname = Identity.currentUser.lastName;
	$scope.email = Identity.currentUser.email;
	$scope.cell = Identity.currentUser.cell;
	$scope.phone_type = Identity.currentUser.phone_type;
	$scope.password = '';
	$scope.address = Identity.currentUser.address;
	$scope.address_2 = Identity.currentUser.address_2;
	$scope.state = Identity.currentUser.state;
	$scope.city = Identity.currentUser.city;

	$scope.update = function() {
		var newUserData = {
			email: $scope.email,
			cell: $scope.cell,
			phone_type: $scope.phone_type,
			password: $scope.password,
			firstName: $scope.fname,
			lastName: $scope.lname,
			address: $scope.address,
			address_2: $scope.address_2,
			state: $scope.state,
			city: $scope.city,
		};
		if($scope.password && $scope.password.length > 0) {
			newUserData.password = $scope.password;
		}

		Auth.updateCurrentUser(newUserData).then(function() {
			Notifier.notify('Your user account has been updated');
		}, function(reason) {
			Notifier.error(reason);
		});
	};

	$scope.states = {
		"AL": "Alabama",
		"AK": "Alaska",
		"AZ": "Arizona",
		"AR": "Arkansas",
		"CA": "California",
		"CO": "Colorado",
		"CT": "Connecticut",
		"DE": "Delaware",
		"DC": "District Of Columbia",
		"FL": "Florida",
		"GA": "Georgia",
		"HI": "Hawaii",
		"ID": "Idaho",
		"IL": "Illinois",
		"IN": "Indiana",
		"IA": "Iowa",
		"KS": "Kansas",
		"KY": "Kentucky",
		"LA": "Louisiana",
		"ME": "Maine",
		"MD": "Maryland",
		"MA": "Massachusetts",
		"MI": "Michigan",
		"MN": "Minnesota",
		"MS": "Mississippi",
		"MO": "Missouri",
		"MT": "Montana",
		"NE": "Nebraska",
		"NV": "Nevada",
		"NH": "New Hampshire",
		"NJ": "New Jersey",
		"NM": "New Mexico",
		"NY": "New York",
		"NC": "North Carolina",
		"ND": "North Dakota",
		"OH": "Ohio",
		"OK": "Oklahoma",
		"OR": "Oregon",
		"PW": "Palau",
		"PA": "Pennsylvania",
		"RI": "Rhode Island",
		"SC": "South Carolina",
		"SD": "South Dakota",
		"TN": "Tennessee",
		"TX": "Texas",
		"UT": "Utah",
		"VT": "Vermont",
		"VA": "Virginia",
		"WA": "Washington",
		"WV": "West Virginia",
		"WI": "Wisconsin",
		"WY": "Wyoming"
	};
});