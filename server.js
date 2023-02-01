const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const UserRoute = require("./src/router/UserRoute");
const bodyparser = require("body-parser");
const multer = require("multer");
// const upload = multer();
// chat
const http = require("http");
const { Server } = require("socket.io");
dotenv.config();

const app = express();
app.use(cors(false));
/* assuming an express app is declared here */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(upload.single("avatar"));
app.use(express.static("public"));

const PORT = process.env.PORT;

const swaggerUi = require("swagger-ui-express");

const swaggerJsdoc = require("swagger-jsdoc");
// SWAGGER
const swaggerOptions = require("./src/utils/swaggerOptions");
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.get("/", (req, res) => {
  return res.send("Server Already Running");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(UserRoute);

// chat
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room_id).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
server.listen(PORT, () =>
  console.log(`Example app listening on port http://localhost:${PORT}`)
);
