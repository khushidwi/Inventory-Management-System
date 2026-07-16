const ExcelJS = require("exceljs");
const path = require("path");
const Product = require("../models/Product");

exports.generateExcelReport = async (req, res) => {

    try {

        const products = await Product.find();

        const workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet("Inventory Report");

        worksheet.columns = [

            { header: "Product Name", key: "productName", width: 30 },

            { header: "Category", key: "category", width: 20 },

            { header: "Price", key: "price", width: 15 },

            { header: "Quantity", key: "quantity", width: 15 },

            { header: "Status", key: "status", width: 20 }

        ];

        products.forEach((product) => {

            worksheet.addRow({

                productName: product.productName,

                category: product.category,

                price: product.price,

                quantity: product.quantity,

                status: product.status

            });

        });

        const filePath = path.join(

            __dirname,

            "../reports/inventory_report.xlsx"

        );

        await workbook.xlsx.writeFile(filePath);

        res.download(filePath);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};