const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    password:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        default:""
    },

    address:{
        type:String,
        default:""
    },

    role:{
        type:String,
        default:"user"
    },

    profileImage:{
        type:String,
        default:""
    },
    otp: {
    type: String,
    default: null
},

otpExpire: {
    type: Date,
    default: null
},

resetPasswordToken: {
    type: String,
    default: null
}

},
{
    timestamps:true
});

module.exports = mongoose.model("User",userSchema);