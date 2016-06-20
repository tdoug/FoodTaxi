angular.module('app').value('Toastr', toastr);

angular.module('app')

	.factory('Notifier', function(Toastr) {
		return {
			notify: function(msg) {
				Toastr.success(msg);
			},
			error: function(msg) {
				Toastr.error(msg);
			},
			loginerror: function(msg) {
				Toastr.warning(msg);
			}
		};
});