var Braintree = require("braintree");
var orders_module = require("../controllers/orders.js");
var Orders = require('mongoose').model('Orders');
var OrdersPayments = require('mongoose').model('OrdersPayments');
var User = require('mongoose').model('User');
/* sandbox config

environment: Braintree.Environment.Sandbox,
    merchantId: 'vttky6b9n2wbh6bj',
    publicKey: 'v87v2bng8qjxp97j',
    privateKey: 'c1839076ce2e4b4e0927d2575e9fe8f7'

*/

function isEmpty(ob){
   for(var i in ob){ return false;}
  return true;
}

exports.logPayPalOrder = function(req, res)
{
    var orderObj = {
      userID: req.body.user_id,
      orderTotal: req.body.grand_total,
      orderItems: req.body.order_items,
      orderStatus: "PayPal Order"
    };

    Orders.create(orderObj, function(err, order) {
      if(err) {
        console.log(err);
      }
      else
      {
          var paymentObj = {
            userID: req.body.user_id,
            orderID: order._id,
            paymentService: "paypal",
            paymentStatus: "In Process",
            paymentTotal: order.orderTotal
          };

        OrdersPayments.create(paymentObj, function(err, orderPayment){
          if(err) {
           console.log(err);
          }
          else
          {
            response_msg.orderPaymentID = orderPayment._id;
            response_msg.orderID = order._id;
            res.send(response_msg);
          }
        });
      }
    });
};

exports.deleteCC = function(req, res) {
  var conditions = { _id: req.body.user_id },
      update = { $unset:{braintreeCCToken:1,  braintreeCustomerID:1}},
      options = { multi: false };
      
      User.update(conditions, update, options, function(err, doc){
        if(!err)
        {
          console.log("Token saved");
          res.send({success:1});
        }
        else
        {
          res.send({failure:1});
          console.log(err);
        }
      });
};

exports.processExistingCCPayment = function(req, res) {
  var response_msg = {}, customer_request = {}, customerID, ccToken, orderID;
  var gateway = Braintree.connect({ //sandbox connect settings
    environment: Braintree.Environment.Sandbox,
    merchantId: 'vttky6b9n2wbh6bj',
    publicKey: 'v87v2bng8qjxp97j',
    privateKey: 'c1839076ce2e4b4e0927d2575e9fe8f7'
  });

  gateway.transaction.sale({
    customerId: req.body.user_id,
    amount: req.body.grand_total,
  }, function (err, result) {
    if (result.success) {
      customerID = result.customer.id;
      ccToken = result.customer.creditCards[0].token;
      
      console.log("Customer Processed");
      
    }
    else
    {
      console.log("Customer processing error");
      console.log(result);
      response_msg.failure = result.message;
      res.send(response_msg);
    }
  });

  var orderObj = {
    postalCode: req.body.postal_code,
    userID: req.body.user_id,
    orderTotal: req.body.grand_total,
    orderItems: req.body.order_items,
    orderStatus: "Complete"
  };
 
  Orders.create(orderObj, function(err, order) {
    if(err) {
      console.log(err);
    }
    else
    {
      var paymentObj = {
        userID: req.body.user_id,
        orderID: order._id,
        paymentService: "braintree_existing_cc",
        paymentStatus: "Completed",
        paymentTotal: order.orderTotal
      };

      OrdersPayments.create(paymentObj, function(err, orderPayment){
        if(err) {
         console.log(err);
        }
        else
        {
          response_msg.orderPaymentID = orderPayment._id;
          response_msg.orderID = order._id;
          res.send(response_msg);
        }
      });
    }
  });

};

exports.processCCPayment = function(req, res) {
  var response_msg = {}, customer_request = {}, customerID, ccToken, orderID;
  var gateway = Braintree.connect({ //sandbox connect settings
    environment: Braintree.Environment.Sandbox,
    merchantId: 'vttky6b9n2wbh6bj',
    publicKey: 'v87v2bng8qjxp97j',
    privateKey: 'c1839076ce2e4b4e0927d2575e9fe8f7'
  });
    
    if(req.body.save_cc == '1')
    {
        customerRequest = {
        id: req.body.user_id,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        creditCard: {
          number: req.body.encrypted_number,
          expirationMonth: req.body.exp_m,
          expirationYear: req.body.exp_y,
          billingAddress: {
            postalCode: req.body.postal_code
          },
          options: {
            verifyCard: true
          }
        }
      };
    }
    else ///process credit card w/o saving
    {

    }

  if(req.body.save_cc == '1')
  {
    gateway.customer.delete(req.body.user_id, function (err) {
      gateway.customer.create(customerRequest, function (err, result) {
        if (result.success) {
          customerID = result.customer.id;
          ccToken = result.customer.creditCards[0].token;

          console.log("Customer Processed");
          var conditions = { _id: req.body.user_id },
          update = { braintreeCCToken : ccToken,  braintreeCustomerID : customerID },
          options = { multi: false };
          
          User.update(conditions, update, options, function(err, doc){
            if(!err)
            {
              console.log("Token saved");
            }
            else
            {
              console.log(err);
            }
          });

          
        } else {
          console.log("Customer processing error");
          console.log(result);
            response_msg.failure = result.message;
            res.send(response_msg);
        }
      });
    });
  }
  else ///process credit card w/o saving
  {

  }

  var orderObj = {
    userID: req.body.user_id,
    orderTotal: req.body.grand_total,
    orderItems: req.body.order_items,
    orderStatus: "Complete"
  };


 
  Orders.create(orderObj, function(err, order) {
    if(err) {
      console.log(err);
    }
    else
    {
      //response_msg.success = order._id;
      var paymentObj = {
        userID: req.body.user_id,
        orderID: order._id,
        paymentService: "braintree_new_cc",
        paymentStatus: "Completed",
        paymentTotal: order.orderTotal
      };

      OrdersPayments.create(paymentObj, function(err, orderPayment){
        if(err) {
         console.log(err);
        }
        else
        {
          response_msg.orderPaymentID = orderPayment._id;
          response_msg.orderID = order._id;
          res.send(response_msg);
        }
      });
    }
  });
};

