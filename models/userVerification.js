const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema

const verificationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobileNumber:{
        type: Number,
    },
    email: {
        type: String,
        required: true 
    },
    address: {
        type: String
    },
    password: {
        type: String
    },
    image:{
        type: String
    },
    verification:{
        type: Boolean
    }
})

// Becrypt method
verificationSchema.pre("save", async function(next) {
    if(!this.isModified('password')){
    next()
}
    this.password = bcrypt.hash(this.password, 10);
})

module.exports = mongoose.model("User", verificationSchema)