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
  // console.log(messages);
  return {
    status: 200,
    message: "sukses get pesan",
    data: messages,
  };
};

const sendMessage = async (data) => {
  try {
    console.log("1");
    const decoded = await jwt.verify(data.sender, "s3cr3t");
    // console.log(decoded);
    if (decoded == null) {
      return {
        status: 401,
        message: "Unautorized access",
        data: null,
      };
    } else {
      console.log("3");
      console.log(decoded);
      const detailRoom = await roomChatService.getDetailRoomChat({
        email: decoded.user_name,
        userRole: decoded.authorities[0],
        roomId: data.roomId,
      });
      console.log("2");
      console.log(detailRoom);
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
      console.log("88");
      console.log(saveMessage);
      const sendMessage = await chatRepository.saveMessage(saveMessage);
      console.log("4");
      console.log(sendMessage);
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
          data: sendMessage.dataValues,
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
