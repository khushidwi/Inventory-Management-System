const express = require("express");

const router = express.Router();

const controller = require("../controllers/supplierController");

console.log("SUPPLIER CONTROLLER:", controller);

const {
    addSupplier,
    getSuppliers,
    getSupplier,
    updateSupplier,
    deleteSupplier
} = require("../controllers/supplierController");

router.post("/add", addSupplier);

router.get("/", getSuppliers);

router.get("/:id", getSupplier);

router.put("/:id", updateSupplier);

router.delete("/:id", deleteSupplier);

module.exports = router;