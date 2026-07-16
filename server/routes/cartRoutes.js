const express = require("express");

const router = express.Router();

const {

    addToCart,

    getCart,

    updateCartItem,

    removeCartItem,

    clearCart

} = require("../controllers/cartController");

// ===============================
// CART ROUTES
// ===============================

router.post("/add", addToCart);

router.get("/:userId", getCart);

router.put("/update", updateCartItem);

router.delete("/remove", removeCartItem);

router.delete("/clear/:userId", clearCart);

module.exports = router;