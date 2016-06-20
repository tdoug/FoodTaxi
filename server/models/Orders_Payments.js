var mongoose = require('mongoose');

var OrdersPaymentSchema = mongoose.Schema({
	userID: {type:String, required:"A user ID is required."},
	orderID: {type:String, required:"An order ID is required."},
	paymentService: {type:String, required:"A service is required."},
	paymentCreated: { type: Date, default: Date.now },
	paymentModified: { type:Date },
	paymentStatus: {type:String, required:"A status is required."},
	paymentTotal: {type:Number, required:"An order total is required"},
	paymentMemo: {type: String }
});

var OrderPayments = mongoose.model('OrdersPayments', OrdersPaymentSchema);