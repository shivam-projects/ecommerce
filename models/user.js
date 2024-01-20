const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema

const userSchema = mongoose.Schema({
    name: {
        type: String,
        //required: true
    },
    mobileNumber:{
        type: Number,
    },
    email: {
        type: String,
        //required: true 
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
    OTP: {
        type: String
    },
    role:{
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }
})

// Becrypt method
userSchema.pre("save", async function(next) {
    if(!this.isModified('password')){
    next()
}
    this.password = await bcrypt.hash(this.password, 10);
})

module.exports = mongoose.model("User", userSchema)