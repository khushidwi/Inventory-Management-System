const Product = require("../models/Product");
const { addActivity } = require("./activityController");

// =============================
// ADD PRODUCT
// =============================

exports.addProduct = async (req, res) => {

    try {
const product = await Product.create({

    ...req.body,

    image: req.file
        ? req.file.filename
        : ""

});
        await addActivity(

    "Product Added",

    "Manager",

    "Manager",

    `${product.productName} was added to inventory.`

);

        res.status(201).json({

            success: true,
            message: "Product Added Successfully",

            product

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
// GET ALL PRODUCTS
// =============================

exports.getProducts = async (req, res) => {

    try {

        const products = await Product.find();

        res.status(200).json({

            success: true,

            count: products.length,

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
// =============================
// GET SINGLE PRODUCT
// =============================

exports.getProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product Not Found"

            });

        }

        res.status(200).json({

            success: true,

            product

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
// UPDATE PRODUCT
// =============================

exports.updateProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true
            }

        );
                await addActivity(

    "Product Updated",

    "Manager",

    "Manager",

    `${product.productName} was updated.`

);

        res.status(200).json({

            success: true,

            message: "Product Updated Successfully",

            product

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
// DELETE PRODUCT
// =============================
// =============================
// DELETE PRODUCT
// =============================

exports.deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product Not Found"

            });

        }

        await Product.findByIdAndDelete(req.params.id);

        await addActivity(

            "Product Deleted",

            "Manager",

            "Manager",

            `${product.productName} was deleted.`

        );

        res.status(200).json({

            success: true,

            message: "Product Deleted Successfully"

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
// LOW STOCK PRODUCTS
// =============================

exports.getLowStockProducts = async (req, res) => {

    try {

        const products = await Product.find({

            quantity: { $lte: 10 }

        });

        res.status(200).json({

            success: true,

            count: products.length,

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
// =============================
// SEARCH PRODUCT
// =============================

exports.searchProducts = async (req, res) => {

    try {

        const keyword = req.query.keyword || "";

        const products = await Product.find({

            productName: {

                $regex: keyword,

                $options: "i"

            }

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
// =============================
// PRODUCT STATISTICS
// =============================

exports.productStats = async (req, res) => {

    try {

        const totalProducts = await Product.countDocuments();

        const lowStock = await Product.countDocuments({

            quantity: { $lte: 10, $gt: 0 }

        });

        const outOfStock = await Product.countDocuments({

            quantity: 0

        });

        const inventory = await Product.find();

        const totalValue = inventory.reduce((sum, item) => {

            return sum + (item.price * item.quantity);

        }, 0);

        res.status(200).json({

            success: true,

            totalProducts,

            lowStock,

            outOfStock,

            totalValue

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