const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Order = require("../models/order");

const app = express();
dotenv.config({ path: "../.env" });

app.use(cors());
app.use(express.json());

require("../db/connectDB");

app.post("/insetOrder", async (req, res) => {
  // console.log(req.body);
  try {
    const order = await Order.create({
      userId: req.body.userId,
      products: req.body.products,
      total: req.body.total,
      status: "pending",
      deliveryType: req.body.deliveryType,
      address: req.body.address,
    })
    res.status(201).json({
      status: "ok",
      order: order._id,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

app.get("/getOrders", async (req, res) => {
  try {
    const orders = await Order.find({status: "pending"});
    res.status(200).json({
      status: "ok",
      orders: orders,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

app.get("/getOrder/:id", async (req, res) => {
  try {
    const order = await Order.findOne({id: req.params.id});
    res.status(200).json({
      status: "ok",
      order: order,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});





const port = process.env.ORDER_PORT || 5002;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
