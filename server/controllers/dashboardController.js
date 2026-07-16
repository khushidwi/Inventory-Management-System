const Product = require("../models/Product");
const Category = require("../models/Category");
const Supplier = require("../models/Supplier");
const Order = require("../models/Order");

exports.getDashboardStats = async (req, res) => {

    try {

        const totalProducts = await Product.countDocuments();

        const lowStock = await Product.countDocuments({
            status: "Low Stock"
        });

        const outOfStock = await Product.countDocuments({
            status: "Out Of Stock"
        });

        const products = await Product.find();

        let inventoryValue = 0;

        products.forEach(product => {

            inventoryValue +=
                product.price * product.quantity;

        });

        // Latest 5 Orders
        const recentOrders = await Order.find()

            .populate("customer", "name")

            .sort({ createdAt: -1 })

            .limit(5);

        res.json({

            success: true,

            dashboard: {

                totalProducts,

                lowStock,

                outOfStock,

                inventoryValue,

                recentOrders

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