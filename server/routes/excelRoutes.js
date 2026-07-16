const express = require("express");
const router = express.Router();

const excelController = require("../controllers/excelController");
const auth = require("../middleware/authMiddleware");

console.log("excelController:", excelController);
console.log("auth:", auth);

router.get(
    "/inventory",
    auth.verifyToken,
    auth.isManager,
    excelController.generateExcelReport
);

module.exports = router;