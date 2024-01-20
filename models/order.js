const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId:{
        type: ObjectId,
        ref: "User"
    },
    cartId:{
        type: ObjectId,
        ref: "Cart"
    },
    address: {
        type: String
    },
    price:{
        type: Number
    },
    status:{
        type: String,
        default: "Not processed",
        enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled", "Completed"]
    },
    admin:{
        type: String
    }
})

module.exports = mongoose.model("Order", orderSchema)