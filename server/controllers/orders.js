//var Orders = require('mongoose').model('Orders');


///TODO return data object of order specified by req.ID
///FORMAT: json
exports.getOrderByID = function(req, res) {

};

/* TODO return data object of all orders specified by status
returns false if user is not an admin */
///FORMAT: json/boolean
exports.getOrdersByStatus = function(req, res) {

};

/* TODO return data object of all user orders specified by user ID,
default sorting is order created date desc */
///FORMAT: json
exports.getUserOrders = function(req, res) {

};

/* TODO verifies a user can access a given order specified by order ID 
IF order created by user ID does not equal current logged in user or admin, return false 
ELSE return success */
///FORMAT: json/boolean
exports.getUserOrderPermission= function(req, res) {

};

/* TODO update data object of order specified by req.ID, 
changes to order using an object with correlating keys */
///FORMAT: json/boolean
exports.updateOrderByID = function(req, res) {

};

////NOTE for data consistency, no method should be created that can delete an order

/* TODO verifies and creates a new order and returns its ID, given a data object from
simplecart and a user object.
/* FORMAT: json with positive flag on success {success : 1},
json with negative flag on failure with err message {succces:0, err:'Invalid email'}
*/
exports.createOrder = function(req, res) {

};