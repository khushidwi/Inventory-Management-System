const { body, validationResult } = require("express-validator");

exports.productValidation = [

    body("productName")
        .notEmpty()
        .withMessage("Product Name is required"),

    body("category")
        .notEmpty()
        .withMessage("Category is required"),

    body("price")
        .isFloat({ min: 0 })
        .withMessage("Price must be greater than 0"),

    body("quantity")
        .isInt({ min: 0 })
        .withMessage("Quantity cannot be negative")

];

exports.validation = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({

            success: false,

            errors: errors.array()

        });

    }

    next();

};