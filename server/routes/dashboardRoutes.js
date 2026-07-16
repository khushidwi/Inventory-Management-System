const express = require("express");

const router = express.Router();

const {
    getDashboardStats
} = require("../controllers/dashboardController");

// ===============================
// GET DASHBOARD STATS
// ===============================

router.get("/", getDashboardStats);

module.exports = router;