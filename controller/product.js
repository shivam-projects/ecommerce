const { response } = require("express");
const Product= require("../models/product");
const fs = require('fs');
const product = require("../models/product");

const _product = {}

_product.createProduct  = async (req, res)=>{
    const {name, price, quantity} = req.body;
    const image = req.file;
    if(!name || !price || !quantity){
        return res.status(401).json({error: "Product details must be required"});
    }
    const product= {name, price, quantity, image: image.path};
    const productDetails = await Product.create(product);
    return res.send(productDetails);
}

_product.updateWithId = async (req, response) => {
    const _id = req.params.id
    const {name, price, quantity} = req.body
    try {
      const product=await  Product.findById({_id: _id});
      if(product){
        const oldPath=product.image
        const result=await Product.findByIdAndUpdate({_id: _id},{name, price, quantity,image:req.file.path})
        fs.unlinkSync(oldPath)
        return response.send(result)
      }else{
        return response.send({message:"error accured"})
      }      
    } catch (error) {
      return response.send(error);
    }
    };

_product.search = async(req, res) =>{
  const word = req.query.search
  const limit = req.query.limit || 5
  const page = req.query.page || 1

  if(!word){
    return res.status(401).json({error: "Please enter something"});
  }

  const totalProducts = await Product.find({
    name: { $regex: word, $options: "i" }
  })
  const pageLength = Math.round(totalProducts.length / limit)

  const products = await Product.find({
    name: { $regex: word, $options: "i" }
  })
  .skip((page - 1) * limit)
  .limit(limit)
  .sort({name: "-1"})
  
  if(products.length > 0){
    return res.status(201).json({products, pageLength});
  } else{
    return res.status(401).json({message: "Product not found."})
  }
}



module.exports= _product;