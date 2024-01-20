// require('dotenv').config()
// const secret_key = process.env.Razorpay_Secret_key
// const razorpay = require('razorpay') (secret_key)
// const Order = require("../models/order")
// const User = require("../models/user")
// const _payment = {}

// var instance = new razorpay({
//   key_id: 'rzp_test_ENZiPZeZqfW6JW',
//   key_secret: 'secret_key',
// });

// _payment.order = async(req, res) =>
//   {
//   const order = await instance.orders.create({
//     amount: req.body.amount,
//     currency: "INR",
//     receipt: "rcp1"
//   });
//   return res.status(201).json({
//     order,
//     amount
//   })
//   }


// _payment.createCustomer = async(req, res) =>{
// const orderId = req.params.orderId
// const order = await Order.findOne({_id: orderId})
// const user = await User.find({_id: order.userId})
// if(!user){
//   res.send({message: "User doesn't Exist"})
// }
// const customer = await stripe.customers.create({
// name: user.name,
// email: user.email
// })
// return res.send(customer);
// }

// _payment.token = async(req, res)=>{
//   const tokens = await stripe.tokens.create({
//   bank_account: {
//     country: 'US',
//     currency: 'usd',
//     account_holder_name: 'Jenny Rosen',
//     account_holder_type: 'individual',
//     routing_number: '110000000',
//     account_number: '000123456789',
//   },
// });
// return res.send(tokens);
// }


// stripe.products.create({
//   name: 'Netflex',
//   description: '199 Rs./Month subscription',
// }).then(product => {
//   stripe.prices.create({
//     unit_amount: 1200,
//     currency: 'INR',
//     recurring: {
//       interval: 'month',
//     },
//     product: product.id,
//   }).then(price => {
//     console.log('Success! Here is your starter subscription product id: ' + product.id);
//     console.log('Success! Here is your starter subscription price id: ' + price.id);
//   });
// });

// module.exports = _payment