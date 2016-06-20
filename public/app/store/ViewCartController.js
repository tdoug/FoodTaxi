angular.module('app')

.controller('ViewCartController', function($scope, $http, $q, $location, User, Identity, Notifier, Auth) {
///TODO add post-order driver notifications

	var order_items = {}, order_temp = {};
	var grand_total = 0, items_checked = 0;
	check_items();

	$scope.goBack = function() {
		window.history.back();
	};

	$scope.first_name = Identity.currentUser.firstName;
	$scope.last_name = Identity.currentUser.lastName;
	$scope.postal_code = Identity.currentUser.postal_code;
	///sandbox testing variables
		$scope.number = "4111111111111111";
		$scope.month = "11";
		$scope.year = "2015";

	simpleCart.each(function(item, x ){
			order_temp.itemID = item.get('id');
			order_temp.qty = item.quantity();
			order_items[x] = order_temp;
		});

	if(Identity.currentUser.braintreeCCToken !== undefined && Identity.currentUser.braintreeCustomerID !== undefined)
	{
		$scope.cc_token_exists = 1;
	}

	$scope.paypalCheckout = function(){
		var submit_object = {
			'user_id': Identity.currentUser._id,
			'order_items': order_items,
			'grand_total': simpleCart.grandTotal(),
		};
		///TODO test paypal checkout, empty cart upon successful checkout
		$http({
				method:'POST',
				url:'/api/payments/set/paypal/',
				data:submit_object
			}).success(function(data, status, headers, config) {
				simpleCart({
					checkout: {
						type: "PayPal" ,
						email: "sterling.silver.smith@gmail.com",
						sandbox:true,
						success: '/order_complete',
						cancel: '/browse'
					}
				});
			});
	};

	$scope.ccNewCheckout = function(){
		
		$scope.cc_new_show = 1;
	};

	$scope.ccExistingCheckout = function()
	{	
		var submit_object = {
			'user_id': Identity.currentUser._id,
			'order_items': order_items,
			'grand_total': simpleCart.grandTotal(),
		};

		$http({
				method:'POST',
				url:'/api/payments/set/cc_new/',
				data:submit_object
			}).success(function(data, status, headers, config) {
				if(typeof data.success !== undefined)
				{
					///TODO email/sms driver with completed item list
					Auth.refreshUser(Identity.currentUser.email);
					Notifier.notify('Your order has been submitted');
					empty_cart();
					$location.path("/order_complete");
					
				}
				else if(data.failure != undefined)
				{
					Notifier.error(data.failure);
				}
			});

	};

	$scope.delete_existing_cc = function() {
		$http({
				method:'POST',
				url:'/api/payments/delete/cc_existing/',
				data:{user_id:Identity.currentUser._id}
			}).success(function(data, status, headers, config) {
				if(typeof data.success !== undefined)
				{
					Auth.refreshUser(Identity.currentUser.email);
					Notifier.notify('Card deleted.');
					$scope.cc_token_exists = 0;
				}
			});
	};

	$scope.ccNewSubmit = function() {
		///TODO add pricecheck
		//action='/api/payments/set/braintree'
		var braintree = Braintree.create("MIIBCgKCAQEAn2MpgX210n27eW/7PJbo4iyXHn97eUJcyWmw+9sn9WDY6XFWHkaWC2Sggfe0kjkfDL3Ku7c/QRjvzvbguUJ0nTUUfMf8JTKO/Pakei5Jn9F88ijYaeklfQS0sdmYtUsy8r7dKrWmMzZ/lTcSIerzgdEgyj0vLjTBoTfAhbmOnPIYqsvHcnaCc0jn6DQPCrrA6fmHVGXiRs9ktw44GKvuY/VruEorPLP3RSltRGcsmSGUPk2hd4W4UWlVWwW+zYUYorw84+UZzyx2TDcfals+ZKZIxA6ETcLeMOxl0/DV0AWfMbEE1/bSGQMmqf7QwBvDQlk19uB2Kq/K+2cv7Y1ikwIDAQAB");
		//braintree.onSubmitEncryptForm("braintree-payment-form");

		var submit_object = {
			'encrypted_number' : braintree.encrypt($scope.number),
			'exp_m' : braintree.encrypt($scope.month),
			'exp_y' : braintree.encrypt($scope.year),
			'first_name': $scope.first_name,
			'last_name': $scope.last_name,
			'postal_code': $scope.postal_code,
			'user_id': Identity.currentUser._id,
			'order_items': order_items,
			'grand_total': simpleCart.grandTotal(),
			'save_cc': $scope.save_cc,
		};

		$http({
				method:'POST',
				url:'/api/payments/set/cc_new/',
				data:submit_object
			}).success(function(data, status, headers, config) {
				if(typeof data.success !== undefined)
				{
					///TODO email/sms driver with completed item list
					Auth.refreshUser(Identity.currentUser.email);
					Notifier.notify('Your order has been submitted');
					empty_cart();
					$location.path("/order_complete");
				}
				else if(data.failure != undefined)
				{
					Notifier.error(data.failure);
				}
			});
	};

	function check_items()
	{
		var price, name, id;	
		var deferred = $q.defer();

		simpleCart.each(function(item, x ){
			name = item.get('name');
			id = item.get('id');
			price = item.get('price');	
			qty = item.quantity();		
			$http({
					method:'POST',
					url:'/api/groceries/get/pricecheck', ///perform pricecheck
					data:{ this_id:id, this_price:price }
				}
				).success(function(data, status, headers, config) {
					deferred.resolve(data);
					if(data.failure == 1)
					{
						Notifier.notify(name + ' failed price check.  Please contact support or re-add items to your cart.');
						$scope.cart_bad_items = 1;
						empty_cart();
						$location.path("/");
						return false;
					}
					else
					{
						grand_total = grand_total + (data.price * qty);	
						items_checked = items_checked + 1;					
					}
				}).
				error(function(data, status, headers, config) {
  
				});
		});
	};

	function empty_cart()
	{
		simpleCart.each(function(item, x ){
			item.remove();
		});
	}
});