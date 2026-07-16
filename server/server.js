const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const errorHandler = require("./middleware/errorMiddleware");


const connectDB = require("./config/db");
console.log(process.env.MONGODB_URI);

dotenv.config({
    path: path.join(__dirname, ".env")
});
connectDB();

const app = express();
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const orderRoutes = require("./routes/orderRoutes");
const activityRoutes = require("./routes/activityRoutes");
const cartRoutes = require("./routes/cartRoutes");
const reportRoutes = require("./routes/reportRoutes");
const excelRoutes = require("./routes/excelRoutes");
console.log("excelRoutes =", excelRoutes);


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/excel", excelRoutes);


app.get("/", (req, res) => {
    res.send("🚀 Inventory Management API Running...");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`✅ Server Running on Port ${PORT}`);
});