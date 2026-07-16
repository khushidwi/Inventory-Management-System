const Cart = require("../models/Cart");

// ===============================
// ADD PRODUCT TO CART
// ===============================

exports.addToCart = async (req, res) => {

    console.log("BODY RECEIVED:");
    console.log(req.body);

    try {

        const { user, product, quantity } = req.body;

        console.log("User:", user);
        console.log("Product:", product);
        console.log("Quantity:", quantity);

        let cart = await Cart.findOne({ user });

        if (!cart) {

            console.log("Creating New Cart...");

            cart = await Cart.create({
                user,
                items: []
            });

        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === product
        );

        if (itemIndex > -1) {

            cart.items[itemIndex].quantity += quantity;

        } else {

            cart.items.push({
                product,
                quantity
            });

        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Product Added",
            cart
        });

    } catch (error) {

        console.log("========== ERROR ==========");
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// ===============================
// GET USER CART
// ===============================

exports.getCart = async (req, res) => {

    try {

        const cart = await Cart.findOne({

            user: req.params.userId

        }).populate("items.product");

        if (!cart) {

            return res.status(200).json({

                success: true,

                cart: {

                    items: []

                }

            });

        }

        res.status(200).json({

            success: true,

            cart

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
// ===============================
// UPDATE CART ITEM
// ===============================

exports.updateCartItem = async (req, res) => {

    try {

        const { user, product, quantity } = req.body;

        const cart = await Cart.findOne({ user });

        if (!cart) {

            return res.status(404).json({

                success: false,

                message: "Cart Not Found"

            });

        }

        const item = cart.items.find(

            item => item.product.toString() === product

        );

        if (!item) {

            return res.status(404).json({

                success: false,

                message: "Product Not Found in Cart"

            });

        }

        item.quantity = quantity;

        await cart.save();

        res.status(200).json({

            success: true,

            message: "Cart Updated",

            cart

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ===============================
// REMOVE ITEM FROM CART
// ===============================

exports.removeCartItem = async (req, res) => {

    try {

        const { user, product } = req.body;

        const cart = await Cart.findOne({ user });

        if (!cart) {

            return res.status(404).json({

                success: false,

                message: "Cart Not Found"

            });

        }

        cart.items = cart.items.filter(

            item => item.product.toString() !== product

        );

        await cart.save();

        res.status(200).json({

            success: true,

            message: "Item Removed",

            cart

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ===============================
// CLEAR CART
// ===============================

exports.clearCart = async (req, res) => {

    try {

        await Cart.findOneAndDelete({

            user: req.params.userId

        });

        res.status(200).json({

            success: true,

            message: "Cart Cleared Successfully"

        });

    }

    catch (error) {

    console.log(error);

    res.status(500).json({

        success:false,
        message:error.message

    });

}

};