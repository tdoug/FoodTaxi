$(document).ready(function(){	
	
	simpleCart.update();

	$('.paypal_checkout').on('click', function(){
		simpleCart({
			checkout: {
			type: "PayPal",
			email: "sterling@keystoke.com"
			}
		});

		simpleCart.checkout();
	});	
});