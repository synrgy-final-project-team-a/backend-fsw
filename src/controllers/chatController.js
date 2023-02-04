const RoomChatService = require("../services/RoomChatService");
const ChatService = require("../services/ChatService");
const UserService = require("../services/UserService");

const goToRoomChat = async (req, res) => {
  const data = await UserService.getDetailUser({
    email: req.user.user_name,
    role: req.user.role,
  });

  if (req.user.role[0] != "ROLE_SK") {
    return res.status(403).json({
      status: 403,
      message: `Role User Adalah ${req.user.role[0]}, Hanya Pencari Kos yang bisa membuat room chat`,
    });
  }

  const goToRoomChat = await RoomChatService.createRoomChat(
    data.data.id,
    req.body.kostId,
    req.user.role[0]
  );

  return res.status(goToRoomChat.status).json(goToRoomChat);
};

const loadMessageController = async (req, res) => {
  const loadMessage = await ChatService.loadMessageService(req.body.roomId);
  // console.log(loadMessage);
  return res.status(loadMessage.status).json(loadMessage);
};

const loadRoomMessageController = async (req, res) => {
  const loadRoom = await RoomChatService.loadRoomChat(
    req.user.user_name,
    req.user.role[0]
  );

  return res.status(loadRoom.status).json(loadRoom);
};

const getHeaderRoomChat = async (req, res) => {
  const loadHeader = await RoomChatService.getHeaderRoomChat(
    req.user.user_name,
    req.user.role[0],
    req.body.roomId
  );

  return res.status(loadHeader.status).json(loadHeader);
};
const getRoomChat = async (req, res) => {
  const getRoomChat = await RoomChatService.joinRoomChat({
    token: req.body.token,
    roomId: req.body.roomId,
  });

  return res.status(getRoomChat.status).json(getRoomChat);
};
const sendMessage = async (req, res) => {
  console.log(req.body.sender);
  const data = await ChatService.sendMessage({
    roomId: req.body.roomId,
    sender: req.body.sender,
    message: req.body.message,
  });
  return res.status(data.status).json(data);
};
module.exports = {
  goToRoomChat,
  loadMessageController,
  loadRoomMessageController,
  getHeaderRoomChat,
  getRoomChat,
  sendMessage,
};
