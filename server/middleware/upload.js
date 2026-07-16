const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "../uploads");

// Create uploads folder automatically if it doesn't exist
if (!fs.existsSync(uploadPath)) {

    fs.mkdirSync(uploadPath, { recursive: true });

}

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, uploadPath);

    },

    filename: function (req, file, cb) {

        cb(

            null,

            Date.now() + path.extname(file.originalname)

        );

    }

});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [

        "image/jpeg",

        "image/png",

        "image/jpg"

    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    }

    else {

        cb(

            new Error("Only JPG and PNG images are allowed"),

            false

        );

    }

};

module.exports = multer({

    storage,

    fileFilter

});