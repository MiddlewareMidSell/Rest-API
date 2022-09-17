const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Order = require("../models/order");

const app = express();
dotenv.config({ path: "../.env" });

app.use(cors());
app.use(express.json());

require("../db/connectDB");

app.post("/insetOrder", (req, res) => {
    const { id, userId, products, total, status, deliveryType, address } = req.body;
    items = products.forEach((product) => {
      product.productId = Number(product.productId);
      product.quantity = Number(product.quantity);
    });

    const order = new Order({
        id,
        userId,
        products,
        total,
        status,
        deliveryType,
        address,
        items,
    });
    

  
});



const port = process.env.PRODUCT_PORT || 5002;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
