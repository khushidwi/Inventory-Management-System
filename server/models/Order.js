const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    products: [

        {

            product: {

                type: mongoose.Schema.Types.ObjectId,

                ref: "Product",

                required: true

            },

            quantity: {

                type: Number,

                required: true,

                min: 1

            }

        }

    ],

    totalAmount: {

        type: Number,

        required: true

    },

    orderStatus: {

        type: String,

        enum: [

            "Pending",

            "Confirmed",

            "Packed",

            "Shipped",

            "Delivered",

            "Cancelled"

        ],

        default: "Pending"

    },

    paymentStatus: {

        type: String,

        enum: [

            "Pending",

            "Paid",

            "Failed"

        ],

        default: "Pending"

    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);