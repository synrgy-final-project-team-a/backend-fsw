const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const UserRoute = require("./src/router/UserRoute");
const bodyparser = require("body-parser");
const multer = require("multer");
// const upload = multer();
// chat
const http = require("http");
const chatService = require("./src/services/ChatService");
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

  socket.on("join-room", (data) => { // data -> {roomId:number, token:string}
    const joinRoom = chatService.joinRoom(data.token)
    if (joinRoom.code == 200) {
      socket.join(data.roomId);
    }

    console.log(`User ${joinRoom.data.first_name} with ID ${joinRoom.data.id} joined room: ${data.roomId}`);
  });

  socket.on("subcribe-notification", (token) => {
    const joinRoom = chatService.joinRoom(data.token)
    if (joinRoom.code == 200) {
      socket.join(joinRoom.id+joinRoom.role);
    }
  });

  // TO-DO : socket send-message, api get room by userId, api get chat by room id
  socket.on("send-message", (data) => {
    socket.to(data.room_id).emit("receive_message", data);
    socket.to("notif123").emit("receive_notification", data);
  });

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  socket.on("join_notification", (data) => {
    socket.join(data);
    console.log(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room_id).emit("receive_message", data);
    socket.to("notif123").emit("receive_notification", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
server.listen(PORT, () =>
  console.log(`Example app listening on port http://localhost:${PORT}`)
);
