const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId:{
        type: ObjectId,
        ref: "User"
    },
    productId:{
        type: ObjectId,
        ref: "Product"
    },
    quantity:{
        type: Number
    }
})

module.exports = mongoose.model("Cart", cartSchema)
