const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
// ref: https://cloudinary.com/documentation/node_integration
var cloudinary = require("cloudinary").v2;
// ref: https://expressjs.com/en/resources/middleware/multer.html
const multer = require("multer");
const UserRoute = require("./src/router/UserRoute")
const bodyparser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const swaggerUi = require("swagger-ui-express");

const swaggerJsdoc = require("swagger-jsdoc");
// SWAGGER
const swaggerOptions = require("./src/utils/swaggerOptions");
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(cors());

app.get("/", (req, res) => {
  return res.send("Server Already Running");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(UserRoute);

/* assuming an express app is declared here */
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.listen(PORT, () =>
  console.log(`Example app listening on port http://localhost:${PORT}`)
);
