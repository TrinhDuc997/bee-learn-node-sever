const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const wordRouter = require("./src/routes/word");

dotenv.config();

/* CONNECT DATABASE - start */
mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("Connected to MongoDB");
});
/* CONNECT DATABASE - end */

const app = express();

app.use(bodyParser.json("50mb"));
app.use(cors());
app.use(morgan("common"));

//GET /api
app.get("/api", (req, res) => {
  res.status(200).json("Hello World");
});

//ROUTER
app.use("/v1/words", wordRouter);

app.listen(8000, () => {
  console.log("sever is running...");
});
