const {
    verifyToken,
    isManager
} = require("../middleware/authMiddleware");

const express = require("express");

const router = express.Router();
const upload = require("../config/multer");
const {
    productValidation,
    validation
} = require("../validators/productValidator");


const {

    addProduct,

    getProducts,

    getProduct,

    updateProduct,

    deleteProduct,
    getLowStockProducts,
    searchProducts,
    productStats

} = require("../controllers/productController");
router.get("/search", searchProducts);

router.get("/low-stock", getLowStockProducts);

router.get("/stats", productStats);

router.post(
    "/add",
    verifyToken,
    isManager,
    upload.single("image"),
    addProduct
);

router.get("/", getProducts);

router.get("/:id", getProduct);
router.post(
    "/add",
    verifyToken,
    isManager,
    productValidation,
    validation,
    addProduct
);
router.put(
    "/:id",
    verifyToken,
    isManager,
    productValidation,
    validation,
    updateProduct
);

router.delete("/:id", verifyToken, isManager, deleteProduct);

module.exports = router;