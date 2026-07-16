const Activity = require("../models/Activity");

// ===============================
// ADD ACTIVITY
// ===============================

exports.addActivity = async (

    action,

    role,

    performedBy,

    description

) => {

    await Activity.create({

        action,

        role,

        performedBy,

        description

    });

};


// ===============================
// GET ALL ACTIVITIES
// ===============================

exports.getActivities = async (req, res) => {

    try {

        const activities = await Activity.find().sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            count: activities.length,

            activities

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
// DELETE ACTIVITY
// ===============================

exports.deleteActivity = async (req, res) => {

    try {

        await Activity.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,

            message: "Activity Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};