const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config({ path: "../.env" });

app.use(cors());
app.use(express.json());

require("../db/connectDB");

app.get("/api", (req, res) => {
  res.send("Hello from server");
});

const port = process.env.AUTH_PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


const getProducts = (req, res) => {
  Product.find()
    .then((data) => {
      return res.status(200).send({ data: data });
    })
    .catch((err) => {
      return res.status(400).send({ err: err });
    });
};

//this is the write abou code in async way to


const getProduct = async (req, res) => {
  try {
    const data = await Product.find();
    return res.status(200).send({ data: data });
  } catch (error) {
    return res.status(400).send({ error: error });
  }
};


