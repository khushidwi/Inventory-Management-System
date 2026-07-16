const express = require("express");

const router = express.Router();
const upload = require("../middleware/upload");

const {

    registerManager,
    registerUser,
    loginManager,
    loginUser,
    forgotPassword,
    verifyOTP,
    resetPassword,
    changeManagerPassword,
updateManagerEmail,
   uploadProfileImage,
changeUserPassword,
updateUserEmail,
uploadUserProfileImage

}  = require("../controllers/authController");

router.post("/manager/register", registerManager);

router.post("/manager/login", loginManager);

router.post("/user/register", registerUser);

router.post("/user/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOTP);

router.post("/reset-password", resetPassword);
router.put("/manager/change-password", changeManagerPassword);
router.put("/manager/update-email", updateManagerEmail);
router.put(

    "/manager/upload-profile",

    upload.single("profile"),
    

    uploadProfileImage

);
router.put("/user/change-password", changeUserPassword);
router.put("/user/update-email", updateUserEmail);

router.put(

    "/user/upload-profile",

    upload.single("profile"),

    uploadUserProfileImage

);

module.exports = router;