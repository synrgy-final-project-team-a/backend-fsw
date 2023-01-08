const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
// ref: https://cloudinary.com/documentation/node_integration
var cloudinary = require("cloudinary").v2;
// ref: https://expressjs.com/en/resources/middleware/multer.html
const multer = require("multer");
const UserRoute = require("./src/router/UserRoute")

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());

app.get("/", (req, res) => {
  return res.send("Hello World !");
});

app.use(UserRoute);

app.listen(PORT, () =>
console.log(`Example app listening on port http://localhost:${PORT}`)
);
