const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const Manager = require("../models/Manager");
const User = require("../models/User");

const path = require("path");
const fs = require("fs");


// ==========================
// REGISTER MANAGER
// ==========================

exports.registerManager = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const exists = await Manager.findOne({ email });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Manager already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const manager = await Manager.create({

            name,
            email,
            password: hashedPassword

        });

        res.status(201).json({

            success: true,
            message: "Manager Registered Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



// ==========================
// REGISTER USER
// ==========================

exports.registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });

        if (exists) {

            return res.status(400).json({

                success: false,
                message: "User already exists"

            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({

            name,
            email,
            password: hashedPassword

        });

        res.status(201).json({

            success: true,
            message: "User Registered Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
// ==========================
// MANAGER LOGIN
// ==========================

exports.loginManager = async (req, res) => {

    try {

        const { email, password } = req.body;

        const manager = await Manager.findOne({ email });

        if (!manager) {

            return res.status(404).json({
                success: false,
                message: "Manager not found"
            });

        }

        const isMatch = await bcrypt.compare(password, manager.password);

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(

            {
                id: manager._id,
                role: manager.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );
await sendEmail(

    manager.email,

    "Login Successful",

    `
        <h2>Hello ${manager.name}</h2>

        <p>You have successfully logged in to the Smart Inventory Management System.</p>

        <p><strong>Login Time:</strong> ${new Date()}</p>

        <p>If this wasn't you, please change your password immediately.</p>
    `

);
        res.status(200).json({

            success: true,
            message: "Login Successful",

            token,

            manager: {

                id: manager._id,
                name: manager.name,
                email: manager.email,
                role: manager.role

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



// ==========================
// USER LOGIN
// ==========================

exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({

                success: false,
                message: "Invalid Password"

            });

        }

        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        ); await sendEmail(

    user.email,

    "Login Successful",

    `
        <h2>Hello ${user.name}</h2>

        <p>You have successfully logged in to the Smart Inventory Management System.</p>

        <p><strong>Login Time:</strong> ${new Date()}</p>

        <p>Have a great day!</p>
    `

);

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
// ==========================
// FORGOT PASSWORD
// ==========================

exports.forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.otp = otp;

        user.otpExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        await sendEmail(

            user.email,

            "Password Reset OTP",

            `
            <h2>Hello ${user.name}</h2>

            <p>Your OTP is:</p>

            <h1>${otp}</h1>

            <p>This OTP is valid for 10 minutes.</p>
            `
        );

        res.status(200).json({

            success: true,

            message: "OTP sent successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ==========================
// VERIFY OTP
// ==========================

exports.verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        if (user.otp !== otp) {

            return res.status(400).json({

                success: false,

                message: "Invalid OTP"

            });

        }

        if (user.otpExpire < Date.now()) {

            return res.status(400).json({

                success: false,

                message: "OTP Expired"

            });

        }

        res.status(200).json({

            success: true,

            message: "OTP Verified Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ==========================
// RESET PASSWORD
// ==========================

exports.resetPassword = async (req, res) => {

    try {

        const { email, otp, newPassword } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        if (user.otp !== otp) {

            return res.status(400).json({

                success: false,

                message: "Invalid OTP"

            });

        }

        if (user.otpExpire < Date.now()) {

            return res.status(400).json({

                success: false,

                message: "OTP Expired"

            });

        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        user.otp = null;

        user.otpExpire = null;

        await user.save();

        res.status(200).json({

            success: true,

            message: "Password Reset Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ==========================
// CHANGE MANAGER PASSWORD
// ==========================

exports.changeManagerPassword = async (req, res) => {

    try {

        const { managerId, currentPassword, newPassword } = req.body;

        const manager = await Manager.findById(managerId);

        if (!manager) {

            return res.status(404).json({

                success: false,
                message: "Manager not found"

            });

        }

        const isMatch = await bcrypt.compare(

            currentPassword,

            manager.password

        );

        if (!isMatch) {

            return res.status(400).json({

                success: false,
                message: "Current Password is Incorrect"

            });

        }

        const hashedPassword = await bcrypt.hash(

            newPassword,

            10

        );

        manager.password = hashedPassword;

        await manager.save();

        res.status(200).json({

            success: true,
            message: "Password Changed Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
// ==========================
// UPDATE MANAGER EMAIL
// ==========================

exports.updateManagerEmail = async (req, res) => {

    try {

        const { managerId, newEmail, password } = req.body;

        const manager = await Manager.findById(managerId);

        if (!manager) {

            return res.status(404).json({

                success: false,

                message: "Manager not found"

            });

        }

        const isMatch = await bcrypt.compare(

            password,

            manager.password

        );

        if (!isMatch) {

            return res.status(400).json({

                success: false,

                message: "Incorrect Password"

            });

        }

        const emailExists = await Manager.findOne({

            email: newEmail

        });

        if (emailExists && emailExists._id.toString() !== manager._id.toString()) {

            return res.status(400).json({

                success: false,

                message: "Email already exists"

            });

        }

        manager.email = newEmail;

        await manager.save();

        res.status(200).json({

            success: true,

            message: "Email Updated Successfully",

            manager: {

                id: manager._id,

                name: manager.name,

                email: manager.email,

                role: manager.role

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ==========================
// UPLOAD PROFILE IMAGE
// ==========================

exports.uploadProfileImage = async (req, res) => {

    try {

        const { managerId } = req.body;

        const manager = await Manager.findById(managerId);

        if (!manager) {

            return res.status(404).json({

                success: false,

                message: "Manager not found"

            });

        }

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "Please select an image"

            });

        }

        manager.profileImage = req.file.filename;

        await manager.save();

        res.status(200).json({

            success: true,

            message: "Profile picture updated successfully",

            image: req.file.filename

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ==========================
// CHANGE USER PASSWORD
// ==========================

exports.changeUserPassword = async (req, res) => {

    try {

        const { userId, currentPassword, newPassword } = req.body;

        const user = await User.findById(userId);

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        const isMatch = await bcrypt.compare(

            currentPassword,
            user.password

        );

        if (!isMatch) {

            return res.status(400).json({

                success: false,
                message: "Current Password is Incorrect"

            });

        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        res.json({

            success: true,
            message: "Password Changed Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// ==========================
// UPDATE USER EMAIL
// ==========================

exports.updateUserEmail = async (req, res) => {

    try {

        const { userId, newEmail, password } = req.body;

        const user = await User.findById(userId);

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        const isMatch = await bcrypt.compare(

            password,
            user.password

        );

        if (!isMatch) {

            return res.status(400).json({

                success: false,
                message: "Incorrect Password"

            });

        }

        user.email = newEmail;

        await user.save();

        res.json({

            success: true,
            message: "Email Updated Successfully",

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// ==========================
// USER PROFILE IMAGE
// ==========================

exports.uploadUserProfileImage = async (req, res) => {

    try {

        const { userId } = req.body;

        const user = await User.findById(userId);

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        user.profileImage = req.file.filename;

        await user.save();

        res.json({

            success: true,
            message: "Profile Updated",

            image: req.file.filename

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};