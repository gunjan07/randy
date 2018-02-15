/**
 * this is test code for Stripe payment
 * Run it: node stripe.js
 */
var stripe = require("stripe")(
    "sk_test_R6NJgmEUvs72yPz8WUHHXhf0"
);

stripe.charges.create({
  amount: 2000,
  currency: "sgd",
  source: "tok_visa", // obtained with Stripe.js
  description: "Charge for RED"
}, {
  idempotency_key: new Date()
}, function (err, charge) {
  console.log(err, charge);
});
