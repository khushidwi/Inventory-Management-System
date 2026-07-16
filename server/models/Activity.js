const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({

    action: {
        type: String,
        required: true
    },

   performedBy: {

    type: String,

    required: true

},

    role: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Activity", activitySchema);