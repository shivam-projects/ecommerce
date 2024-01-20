const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32
    },
    images: {
        type: Array,
        required: true
    },
})

module.exports = mongoose.model("Brand", brandSchema)