const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config({ path: "../.env" });

app.use(cors());
app.use(express.json());

app.post("/notification", (req, res) => {
  const type = req.body.type;
  if (type === "email") {
    // email notification
    const { email, message } = req.body;
    if (email.length < 3) {
      res.status(400).json({
        status: "error",
        message: "Email must be at least 3 characters",
      });
    } else if (message.length < 3) {
      res.status(400).json({
        status: "error",
        message: "Message must be at least 3 characters",
      });
    } else {
      res.status(200).json({
        status: "ok",
        message: "Email sent",
      });
    }
  } else if (type === "sms") {
    // sms notification
    const { phoneNumber, message } = req.body;
    if (phoneNumber.length !== 10) {
      res.status(400).json({
        status: "error",
        message: "Phone number must be 10 digits",
      });
    } else if (message.length < 3) {
      res.status(400).json({
        status: "error",
        message: "Message must be at least 3 characters",
      });
    } else {
      res.status(200).json({
        status: "ok",
        message: "SMS sent",
      });
    }
  } else {
    res.status(400).json({
      status: "error",
      message: "Notification type not supported",
    });
  } 
});

const port = process.env.NOTIFICATION_PORT || 5003;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
