const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Product = require("../models/products");

const app = express();
dotenv.config({ path: "../.env" });

app.use(cors());
app.use(express.json());

require("../db/connectDB");

app.post("/insertProduct", async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      image: req.body.image,
    })
    res.status(201).json({
      status: "ok",
      product: product._id,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});


app.get("/getProducts", async (req, res) => {
  Product.find()
    .then((result) => {
      res.status(200).json({
        status: "ok",
        message: "Products fetched successfully",
        products: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "error",
        message: err.message,
      });
    });
});

app.get("/getProduct/:id", async (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((result) => {
      res.status(200).json({
        status: "ok",
        message: "Product fetched successfully",
        product: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "error",
        message: err.message,
      });
    });
});

app.put("/updateProduct/:id", async (req, res) => {
  const id = req.params.id;
  Product.findByIdAndUpdate(id, req.body)
    .then((result) => {
      res.status(200).json({
        status: "ok",
        message: "Product updated successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "error",
        message: err.message,
      });
    });
});

app.delete("/deleteProduct/:id", (req, res) => {
  const id = req.params.id;
  Product.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({
        status: "ok",
        message: "Product deleted successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "error",
        message: err.message,
      });
    });
});



const port = process.env.PRODUCT_PORT || 5001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
