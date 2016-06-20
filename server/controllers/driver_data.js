//var Driver_jobs = require('mongoose').model('Driver_jobs'),
//Driver_ratings = require('mongoose').model('Driver_ratings');


/* DRIVER JOBS */

/* TODO returns all current Driver jobs as a data object given a Driver User ID 
and a status (In Process, Out on Delivery, Complete, Cancelled) */
//FORMAT: json
exports.getDriverJobsByUserID = function(req, res) {

};

/* TODO returns all current  Driver jobs as a data object given a Customer User ID 
and a status (In Process, Out on Delivery, Complete, Cancelled) */
//FORMAT: json
exports.getDriverJobsByDeliveryTargetUserID = function(req, res) {

};

/* TODO returns all current driver jobs as a data object given a status 
(In Process, Out on Delivery, Complete, Cancelled), returns false if current user
is not admin */
//FORMAT: json
exports.getDriverJobsByStatus = function(req, res) {

};

/* TODO returns all current  Driver jobs as a data object, 
returns false if current user is not admin */
//FORMAT: json
exports.getDriverJobs = function(req, res) {

};

/* TODO validates and create a driver job given a driver ID, customer ID, and order ID, 
returns false if validation fails, e.g. {success:0, msg: "No products in order"} */
//FORMAT: json/boolean
exports.createDriverJob = function(req, res) {

};

/* TODO update a driver job given a driver job ID, and a data object containing changes
corresponding to keys, e.g {status:"Complete"}*/
//FORMAT: json/boolean
exports.updateDriverJobByDriverJobID = function(req, res) {

};

///NOTE for data integrity, no deletion method should be written

/* DRIVER RATINGS */

/* TODO returns all current Driver ratings as a data object given a driver User ID */
//FORMAT: json
exports.getDriverRatingsByUserID = function(req, res) {

};

/* TODO returns all current Driver rating as a data object given a Customer User ID  */
//FORMAT: json
exports.getDriverRatingsByDeliveryTargetUserID = function(req, res) {

};

/* TODO returns an aggregate driver (out of 100) rating as a data object
 given a driver User ID */
//FORMAT: json
exports.getDriverRatingsAggregateByUserID = function(req, res) {

};

/* TODO returns all Driver ratings as a data object, 
returns false if current user is not admin, sort by rating created date desc */
//FORMAT: json
exports.getDriverRatings = function(req, res) {

};

/* TODO returns all aggregate Driver ratings jobs as a data object, 
returns false if current user is not admin, sort by number of rating entries desc */
//FORMAT: json
exports.getDriverRatingsAggregate = function(req, res) {

};

/* TODO validates and create a driver job given a driver ID, customer ID, 
rating amount, and order ID, returns false if validation fails, 
e.g. {success:0, msg: "No products in order"} */
//FORMAT: json/boolean
exports.createDriverRating = function(req, res) {

};

/* TODO update a driver rating given a driver job ID, 
and a data object containing changes corresponding to keys, 
e.g {rating:80}*/
//FORMAT: json/boolean
exports.updateDriverRatingByRatingID = function(req, res) {

};

///NOTE for data integrity, no deletion method should be written
