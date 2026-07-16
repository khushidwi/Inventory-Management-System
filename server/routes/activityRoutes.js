const express = require("express");

const router = express.Router();

const {

    getActivities,

    deleteActivity,
    clearActivities

} = require("../controllers/activityController");

router.get("/", getActivities);

router.delete("/:id", deleteActivity);

module.exports = router;