const Order = require("../models/Order");
const updateInventory = require("../utils/InventoryUtils");
const { addActivity } = require("./activityController");

// =============================
// CREATE ORDER
// =============================

exports.createOrder = async (req, res) => {

    try {

        const {

            customer,
            products,
            totalAmount,
            orderStatus,
            paymentStatus

        } = req.body;

        if (!customer || !products || products.length === 0) {

            return res.status(400).json({

                success: false,
                message: "Invalid Order Data"

            });

        }

        const order = await Order.create({

            customer,
            products,
            totalAmount,
            orderStatus,
            paymentStatus

        });

        await updateInventory(products);

        await addActivity(

            "Order Created",

            "User",

            customer,

            `Order ${order._id} placed successfully`

        );

        res.status(201).json({

            success: true,
            message: "Order Created Successfully",
            order

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
exports.getOrders = async (req, res) => {

    try {

        const orders = await Order.find()

.populate("customer", "name email")

.populate("products.product", "productName price image")

.sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            count: orders.length,

            orders

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
exports.getOrder = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)
            .populate("customer")
            .populate("products.product");

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order Not Found"

            });

        }

        res.status(200).json({

            success: true,

            order

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
exports.updateOrder = async (req, res) => {

    try {

        const order = await Order.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.status(200).json({

            success: true,

            message: "Order Updated Successfully",

            order

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.deleteOrder = async (req, res) => {

    try {

        await Order.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,

            message: "Order Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =============================
// SEARCH ORDERS
// =============================

exports.searchOrders = async (req, res) => {

    try {

        const keyword = req.query.keyword || "";

        const orders = await Order.find()

        .populate("customer", "name email")

        .populate("products.product", "productName")

        .or([

            {
                orderStatus: {
                    $regex: keyword,
                    $options: "i"
                }
            },

            {
                paymentStatus: {
                    $regex: keyword,
                    $options: "i"
                }
            }

        ]);

        res.status(200).json({

            success: true,

            orders

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =============================
// GET USER ORDERS
// =============================

exports.getUserOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            customer: req.params.userId

        })

        .populate("products.product")

        .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            orders

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
console.log("ORDER CONTROLLER:", module.exports);