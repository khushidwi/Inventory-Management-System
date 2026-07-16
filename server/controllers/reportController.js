const Product = require("../models/Product");
const Order = require("../models/Order");

// =============================
// REPORT STATISTICS
// =============================

exports.getReportStats = async (req, res) => {

    try {

        const totalProducts = await Product.countDocuments();

        const totalOrders = await Order.countDocuments();

        const totalRevenue = await Order.aggregate([

            {
                $match: {
                    paymentStatus: "Paid"
                }
            },

            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$totalAmount"
                    }
                }
            }

        ]);

        const lowStockProducts = await Product.countDocuments({

            quantity: {
                $lte: 10
            }

        });

        res.status(200).json({

            success: true,

            totalProducts,

            totalOrders,

            totalRevenue:
                totalRevenue.length > 0
                    ? totalRevenue[0].total
                    : 0,

            lowStockProducts

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
// LOW STOCK REPORT
// =============================

exports.getLowStockReport = async (req, res) => {

    try {

        const products = await Product.find({

            quantity: { $lte: 10 }

        });

        res.status(200).json({

            success: true,

            products

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};