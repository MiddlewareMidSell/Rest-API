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

const port = process.env.NOTIFICATION_PORT || 5003;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
