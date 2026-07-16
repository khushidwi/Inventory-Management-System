require("dotenv").config({
    path: "./server/.env"
});

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Not Loaded ❌");

const sendEmail = require("./utils/sendEmail");

sendEmail(
    "your_email@gmail.com",   // Put YOUR email here
    "Inventory Test",
    "<h2>Email Test Successful</h2>"
);