const Order = require('../models/order')
const Cart = require('../models/cart')
const User = require('../models/user')
const Product= require("../models/product");

const _order = {}

_order.order = async(req, res)=>{
    const cartId = req.params.cartId
    console.log("cartId",cartId)
    const userId = req.id
    const {status} = req.body
    try{
      const user =await User.findOne({_id: userId});
      const Address = req.body.address || user.address;
      const cart = await Cart.findOne({_id: cartId});
      if(cart){
        const product = await Product.findOne({_id: cart.productId})
        console.log(product.price)
        const price = product.price * cart.quantity;
      const order = {cartId, userId, Address, price, status}
      await Order.create(order);
      return res.status(200).json({message: "Order Successfully"})
      }
    }catch(error){
      res.send(error)
    }
  }
  
_order.update = async (req, res) => {
  const orderId = req.params.orderId;
  const {status} = req.body;
  const userId = req.id;
  const user = User.findOne({_id: userId})
  try{
  if(user.role = "admin"){
    const order = await Order.findByIdAndUpdate({_id: orderId}, {status})
    console.log(order)
    if(order){
      if(status === "Completed"){
        // const cart = order.cartId;
        await Cart.deleteOne({_id: order.cartId})
        return res.status(200).json({message: "Updated"})
      }
    }
  }
}catch(error){
    res.status(error);
  }
}

module.exports = _order