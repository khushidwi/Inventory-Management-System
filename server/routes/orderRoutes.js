const express = require("express");

const router = express.Router();

const {

    createOrder,

    getOrders,

    getOrder,

    updateOrder,

    deleteOrder,
    searchOrders,
       getUserOrders

} = require("../controllers/orderController");

router.post("/create", createOrder);

router.get("/", getOrders);
router.get("/search", searchOrders);

router.get("/user/:userId", getUserOrders);

router.get("/:id", getOrder);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

module.exports = router;