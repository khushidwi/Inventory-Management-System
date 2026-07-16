const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {

        return res.status(401).json({
            success: false,
            message: "Access Denied. Token Missing."
        });

    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    }

    catch (error) {

        return res.status(401).json({

            success: false,
            message: "Invalid Token"

        });

    }

};
exports.isManager = (req, res, next) => {

    if (req.user.role !== "manager") {

        return res.status(403).json({

            success: false,
            message: "Manager Access Only"

        });

    }

    next();

};