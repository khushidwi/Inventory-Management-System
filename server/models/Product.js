const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true,
        image: {

    type: String,

    default: ""

},
        trim: true
    },

   productCode: {
    type: String,
    default: ""
},

   category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null
},

    brand: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    },

    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    lowStockLimit: {
        type: Number,
        default: 10
    },

  supplier: {
    type: String,
    default: ""
},

    status: {
        type: String,
        enum: ["In Stock", "Low Stock", "Out of Stock"],
        default: "In Stock"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);