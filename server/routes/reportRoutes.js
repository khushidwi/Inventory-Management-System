const express = require("express");

const router = express.Router();
const {

    getReportStats,

    getLowStockReport

} = require("../controllers/reportController");

router.get("/stats", getReportStats);
router.get("/low-stock", getLowStockReport);

module.exports = router;