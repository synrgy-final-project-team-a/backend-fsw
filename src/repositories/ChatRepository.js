const models = require("../../db/models/index.js");
const chatModel = models.chat;

const loadMessageByKostId = async (roomId) => {
  const loadMessage = await chatModel.findAll({
    where: {
      room_chat_id: roomId,
    },
    order: [
      ["created_at", "ASC"]
    ]
  });
  // console.log(loadMessage);
  return loadMessage;
};

const saveMessage = async (payload) => {
  return await chatModel.create(payload);
};

const updateStatusMessage = async(roomChatId, senderId) => {
  const updateStatus = await chatModel.update(
    {status_message: "READED"},
    {where:{
      room_chat_id: roomChatId,
      sender_id: senderId
    }}
  );

  return updateStatus;
};

module.exports = {
  loadMessageByKostId,
  saveMessage,
  updateStatusMessage
};
