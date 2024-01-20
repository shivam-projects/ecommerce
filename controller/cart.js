const { Aggregate } = require("mongoose");
const Cart = require("../models/cart");
const product = require("../models/product");

const _cart = {};

_cart.create = async(req, res) =>{
   const userId = req.id;
   const productId = req.params.productId;
   const {quantity} = req.body;
   try{
    const productExist = await Cart.findOne({$and:[{userId: userId} ,{productId: productId} ]})
    if(productExist){
        productExist.quantity += quantity;
        await productExist.save()
        return res.status(201).json({Message: "added"}) 
    }else{
        const cart = {userId, productId, quantity}
        console.log(cart)
        await Cart.create(cart)
        return res.status(201).json({Message: "item added"})
    }  }catch (error) {
        res.send(error);
      }};

      _cart.getCart = async(req, res) =>{
        const result = await Cart.aggregate([
            {
                $lookup: {
                    from: "products",         //collectionName
                    localField: "productId",  //cartId
                    foreignField: "_id",      //productId
                    as: "products"
                 },
                },
                 {
                 $unwind: "$products",     //forUnwindArray
                 },
                 {
                 $addFields: {             //addNewField
                    totalCost: {
                        $multiply: ["$products.price", "$quantity"]
                    }
                },
            },
            {
                $group:{
                    _id: "$_id",
                    products: {$first: "$products"},
                    totalCost: {$sum: "$totalCost"}
                }
            }
        ])
        return res.send(result);
      }


      _cart.increase = async(req, res)=>{
        const userId = req.id;
        const productId = req.params.productId;
        const {quantity} = req.body;
        const item = await Cart.findOne({$and:[{userId: userId}, {productId: productId} ]});
        if(item){
            item.quantity += quantity;
            await item.save();
            return res.status(201).json({Message: "Item Added"})
        }else{
            const create = {userId, productId, quantity};
            await Cart.create(create);
            return res.send(create);
        }
    }

    //decreasing item from Cart
    _cart.decrease = async(req, res)=>{
        const userId = req.id;
        const productId = req.params.productId;
        const {quantity} = req.body;
        const item = await Cart.findOne({$and:[{userId: userId}, {productId: productId} ]});
           if(item.quantity > quantity) {
            item.quantity -= quantity;
            await item.save();
            return res.status(201).json({Message: "Quantity Decreased"})
        }else{
            await Cart.deleteOne({productId: productId})
            return res.status(201).json({Message: "Deleted"})
        }
    }

    
        module.exports = _cart