/* TODO conform signup process to client specification */

angular.module('app')

.controller('RegisterController', function($rootScope, $scope, $http, $location, User, Notifier, Auth) {

	$scope.goBack = function() { 
		window.history.back();
	};

	if($rootScope.fromsignin === true) {
		$scope.intromessage = "Don't have an account? Register now.";
	}

	$scope.findStore = function(req, res) {
		$http({
				method:'POST',
				url:'/api/stores/get/postal',
				data:{ zip:$scope.zip }
				}
				).success(function(data, status, headers, config) {
					
					if(data.length > 0)
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

	$scope.store_clicked = function(){
		$scope.selected_store_id.$dirty = true;
	};

	$scope.signup = function() {
		var newUserData = {
			firstName: $scope.fname,
			lastName: $scope.lname,
			address: $scope.address,
			address_2: $scope.address_2,
			postal_code: $scope.zip,
			state: $scope.state,
			city: $scope.city,
			email: $scope.email,
			cell: $scope.cell,
			password: $scope.password,
			confirm: $scope.confirm,
			store_id: $scope.selected_store_id
		};

		if($scope.password !== $scope.confirmPassword) {
			$scope.err = "Your passwords don't match";
			return $scope.err;
		} else {
			Auth.createUser(newUserData).then(function() {
				Notifier.notify('User account created');
				$location.path('/validation');
			}, function(reason) {
				Notifier.error(reason);
			})
		}
	}

	$scope.validate = function() {
		$location.path('/main');
	}

	$scope.$watch('state', function(newVal, oldVal, scope) 
	{
        if (newVal)
        {
			$http({
				method:'POST',
				url:'/api/geo/getCitiesByState',
				data:{ state:document.getElementById('state-select').value }
				//headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
				})
				.success(function(data, status, headers, config) {
					$scope.cities = data;
				})
				.error(function(data, status, headers, config) {

				});
		}
    });

   //  $scope.$watch('fname', function(newVal, oldVal, scope) {
   //  	if(newVal) {
   //  		$http({
		 //    	method: 'POST',
		 //    	url: '/api/geo/getStates'
			// })
   //  		.success(function(data, status, headers, config) {
   //  			$scope.states = data;
	  //   	})
		 //    .error(function(data, status, headers, config) {
		 //    	console.log("ERROR: " + data);
		 //    })
   //  	}
   //  });

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