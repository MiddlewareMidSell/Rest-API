const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config({ path: "../.env" });

app.use(cors());
app.use(express.json());

app.post("/payment", (req, res) => {
  const type = req.body.type;
  if(type === "card"){
    // card payment
    const { cardNumber, cardHolder, securityCode, amount } = req.body;
    if (cardNumber.length !== 16) {
      res.status(400).json({
        status: "error",
        message: "Card number must be 16 digits",
      });
    } else if (cardHolder.length < 3) {
      res.status(400).json({
        status: "error",
        message: "Card holder name must be at least 3 characters",
      });
    } else if (securityCode.length !== 3) {
      res.status(400).json({
        status: "error",
        message: "Security code must be 3 digits",
      });
    } else if (amount < 1) {
      res.status(400).json({
        status: "error",
        message: "Amount must be greater than 0",
      });
    } else {
      res.status(200).json({
        status: "ok",
        message: "Payment successful",
      });
    }
    

  }else if(type === "mobile"){
    // mobile payment
    const { mobileNumber, amount, securityCode, cardHolder } = req.body;
    if (mobileNumber.length !== 10) {
      res.status(400).json({
        status: "error",
        message: "Mobile number must be 10 digits",
      });
    } else if (cardHolder.length < 3) {
      res.status(400).json({
        status: "error",
        message: "Card holder name must be at least 3 characters",
      });
    } else if (securityCode.length !== 4) {
      res.status(400).json({
        status: "error",
        message: "Security code must be 3 digits",
      });
    } else if (amount < 1) {
      res.status(400).json({
        status: "error",
        message: "Amount must be greater than 0",
      });
    } else {
      res.status(200).json({
        status: "ok",
        message: "Payment successful",
      });
    }
    
  }else{
    res.status(400).json({
      status: "error",
      message: "Invalid payment type",
    });
  }
});

const port = process.env.PAYMENT_PORT || 5002;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
