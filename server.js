const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const UserRoute = require("./src/router/UserRoute");
const ChatRoute = require("./src/router/ChatRoute");
const bodyparser = require("body-parser");
const multer = require("multer");
// const upload = multer();
// chat
const http = require("http");
const chatService = require("./src/services/ChatService");
const roomChatService = require("./src/services/RoomChatService")
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
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join-room", (data) => { // data -> {roomId:number, token:string}
    const joinRoom = roomChatService.joinRoomChat(data)
    if (joinRoom.code == 200) {
      console.log(`User ${(joinRoom.data.role_user == "ROLE_SK") ? joinRoom.data.seeker_id : joinRoom.data.tenant_id} with role ${joinRoom.data.role_user} joined room: ${data.roomId}`);
      socket.join(data.roomId);
    } else {
      console.log(joinRoom);
    }
  });

  socket.on("subscribe-notification", (data) => {
    const joinRoom = roomChatService.joinRoom(data)
    if (joinRoom.code == 200) {
      socket.join((joinRoom.data.role_user == "ROLE_SK") ? joinRoom.data.seeker_id : joinRoom.data.tenant_id + "-||-" + joinRoom.data.role_user);
    }
  });

  /** TEST CASE SOCKET.IO
   misal room
   {
      id: 1
      seeker_id:2
      tenant_id:1
      kost_id:9
   }
   
   misal seeker:
    {
      id: 2
      role: ROLE_SK
    }
    maka dia join notif dengan unique 2-||-ROLE_SK

    misal tenant
    {
      id: 1
      role: ROLE_TN
    }
    maka dia join notif dengan unique 1-||-ROLE_TN

    kemudian
    tenant mengirim pesan maka notif akan terkirim ke user dengan unique socket notif => 2-||-ROLE_SK (diterima si seeker) ------ test passed
    jika seeker mengirim pesan maka notif akan terkirim ke user dengan unique socket notif => 1-||-ROLE_TN (diterima si tenant) ------ test passed
   * **/

  socket.on("send-message", (data) => { // data -> {roomId:number, message:string, sender:string(token)}
    const sendMessage = chatService.sendMessage(data);
    if (sendMessage.status == 200) {
      socket.to(sendMessage.data.room_chat_id).emit("receive-message", sendMessage.data);

      if (sendMessage.data.status_sender = "ROLE_SK") {
        socket.to((joinRoom.data.role_user == "ROLE_SK") ? joinRoom.data.tenant_id : joinRoom.data.seeker_id + "-||-" + (joinRoom.data.role_user == "ROLE_SK") ? "ROLE_TN" : "ROLE_SK").emit("subscribe-notification", data);
      }
    }
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
