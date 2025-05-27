const express = require("express");
const userRoutes = require("./controller");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongoDb is connected")
    app.listen(5151, () => {
      console.log("mongodb server is runnning port 5151");
    });
  })
  .catch(() => {
    console.log();
  });
