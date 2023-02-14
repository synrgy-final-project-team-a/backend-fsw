const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userService = require("./UserService");
const roomChatService = require("./RoomChatService");
const chatRepository = require("../repositories/ChatRepository");

const sendChat = async (data) => {
  const decoded = await jwt.verify(data.user, process.env.TOKEN_SECRET);

  try {
    const decoded = await jwt.verify(tokenUser, process.env.TOKEN_SECRET);

    if (decoded == null) {
      return {
        status: 401,
        message: "Unautorized access",
        data: null,
      };
    } else {
      return await userService.getDetailUser({
        email: decoded.user_name,
        role: decoded.role[0],
      });
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Token Invalid",
      data: null,
    };
  }
};

const loadMessageService = async (roomId) => {
  const messages = await chatRepository.loadMessageByKostId(roomId);

  return {
    status: 200,
    message: "sukses get pesan",
    data: messages,
  };
};

const sendMessage = async (data) => {
  try {
    const decoded = await jwt.verify(data.sender, "s3cr3t");
    if (decoded == null) {
      return {
        status: 401,
        message: "Unautorized access",
        data: null,
      };
    } else {
      const detailRoom = await roomChatService.getDetailRoomChat({
        email: decoded.user_name,
        userRole: decoded.authorities[0],
        roomId: data.roomId,
      });

      const saveMessage = {
        room_chat_id: data.roomId,
        sender_id:
          detailRoom.data.role_user === "ROLE_SK"
            ? detailRoom.data.seeker_id
            : detailRoom.data.tenant_id,
        status_sender: detailRoom.data.role_user,
        message: data.message,
        status_message: null,
      };

      const sendMessage = await chatRepository.saveMessage(saveMessage);

      if (!sendMessage) {
        return {
          status: 101,
          message: "failed send message",
          data: null,
        };
      } else {
        return {
          status: 200,
          message: "success send message",
          data: { output: sendMessage.dataValues, dataRoom: detailRoom.data },
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Token Invalid",
      data: null,
    };
  }
};

module.exports = { sendChat, loadMessageService, sendMessage };
