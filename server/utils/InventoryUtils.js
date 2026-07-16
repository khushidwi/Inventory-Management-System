const Product = require("../models/Product");
const Activity = require("../models/Activity");
const sendEmail = require("../utils/sendEmail");

const updateInventory = async (orderedProducts) => {

    for (const item of orderedProducts) {

        const product = await Product.findById(item.product);

        if (!product) {
            continue;
        }

    if (product.quantity < item.quantity) {

    throw new Error(

        `${product.productName} does not have enough stock`

    );

}

product.quantity -= item.quantity;

        if (product.quantity <= 0) {

            product.quantity = 0;

            product.status = "Out of Stock";

        }

        else if (product.quantity <= product.lowStockLimit) {

    product.status = "Low Stock";

    await sendEmail(

        process.env.EMAIL_USER,

        "Low Stock Alert",

        `
            <h2>Low Stock Warning</h2>

            <p>

                ${product.productName}

                has only

                ${product.quantity}

                items remaining.

            </p>

        `

    );

}

        else {

            product.status = "In Stock";

        }
await Activity.create({

    action: "Inventory Updated",

    performedBy: "System",

    role: "System",

    description: `${product.productName} stock reduced by ${item.quantity}`

});
        await product.save();

    }

};

module.exports = updateInventory;