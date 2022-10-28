const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("../models/user");

const app = express();
dotenv.config({ path: "../.env" });

app.use(cors());
app.use(express.json());

require("../db/connectDB");
const jwt = require("jsonwebtoken");

app.post("/Register", async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({
      status: "ok",
      user: user._id,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});


app.post("/Login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      console.log(user);
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        process.env.SECRET_KEY
      );
      res.status(200).json({
        status: "ok",
        user: token,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});

const port = process.env.AUTH_PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
