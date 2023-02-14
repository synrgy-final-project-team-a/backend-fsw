const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const UserRoute = require("./src/router/UserRoute");
const ChatRoute = require("./src/router/ChatRoute");
// chat
const http = require("http");
const chatService = require("./src/services/ChatService");
const roomChatService = require("./src/services/RoomChatService");
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
app.use(ChatRoute);

// chat
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join-room", async (data) => {
    // data -> {roomId:number, token:string}
    const joinRoom = await roomChatService.joinRoomChat(data);
    if (joinRoom.status == 200) {
      console.log(
        `User ${
          joinRoom.data.role_user == "ROLE_SK"
            ? joinRoom.data.seeker_id
            : joinRoom.data.tenant_id
        } with role ${joinRoom.data.role_user} joined room: ${data.roomId}`
      );
      socket.join(data.roomId);
    } else {
      console.log(joinRoom);
    }
  });

  socket.on("subscribe-notification", async (data) => {
    // data -> {token:string}
    const joinRoom = await roomChatService.joinNotif(data);
    if (joinRoom.status == 200) {
      socket.join(joinRoom.data.id + "-||-" + joinRoom.data.role);
      console.log(joinRoom.data.id + "-||-" + joinRoom.data.role);
    }
  });

  socket.on("load-room-chat", async (data) => {
    // data -> {token:string}
    const joinRoom = await roomChatService.joinNotif(data);
    if (joinRoom.status == 200) {
      socket.join(joinRoom.data.id + "-room-chat-" + joinRoom.data.role);
    }
  });

  socket.on("send-message", async (data) => {
    // data -> {roomId:number, message:string, sender:string(token)}
    const sendMessage = await chatService.sendMessage(data);
    const loadMessage = await roomChatService.loadRoomChatBySocket(data);

    if (sendMessage.status == 200) {
      socket
        .to(sendMessage.data.output.room_chat_id)
        .emit("receive-message", sendMessage.data.output);

      socket
        .to(
          (sendMessage.data.output.status_sender == "ROLE_SK"
            ? sendMessage.data.dataRoom.tenant_id
            : sendMessage.data.dataRoom.seeker_id) +
            "-||-" +
            (sendMessage.data.output.status_sender == "ROLE_SK"
              ? "ROLE_TN"
              : "ROLE_SK")
        )
        .emit("subscribe-notification", sendMessage.data.output);

      socket
        .to(
          (sendMessage.data.output.status_sender == "ROLE_SK"
            ? sendMessage.data.dataRoom.tenant_id
            : sendMessage.data.dataRoom.seeker_id) +
            "-room-chat-" +
            (sendMessage.data.output.status_sender == "ROLE_SK"
              ? "ROLE_TN"
              : "ROLE_SK")
        )
        .emit("load-room-chat", loadMessage);
    }
  });
  socket.on("leave-room", async (data) => {
    socket.leave(data);
    console.log("leaveRoom" + data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
server.listen(PORT, () =>
  console.log(`Example app listening on port http://localhost:${PORT}`)
);

module.exports = server;
