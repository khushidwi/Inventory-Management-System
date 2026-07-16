const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({

    supplierName: {
        type: String,
        required: true,
        trim: true
    },

    companyName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
        type: String,
        default: ""
    },

    gstNumber: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Supplier", supplierSchema);