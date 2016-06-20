///TODO order database schema
/*
SKELETON FIELDS for order document: 
use mongo ID for order ID, 
user ID for correlation, 
order created on date as stamp (int), 
order modified date as stamp (int),
order status (In Cart, In Payment, Completed)
order_total as int
*/

var mongoose = require('mongoose');

var OrderSchema = mongoose.Schema({
	userID: {type:String, required:"A user ID is required."},
	orderItems: { type: Object, required:"Order items is required." },
	orderCreated: { type: Date, default: Date.now },
	orderModified: { type:Date },
	orderStatus: {type:String, default: "In Process"},
	orderTotal: {type:Number, required:"An order total is required"},
	postalCode: {type:String}
});

var Orders = mongoose.model('Orders', OrderSchema);