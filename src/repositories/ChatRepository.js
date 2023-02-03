const { sequelize, Sequelize } = require("../../db/models/index.js");
const models = require("../../db/models/index.js");
const chatModel = models.chat;

const loadMessageByKostId = async(roomId) => {
    const loadMessage = await chatModel.findAll({
        where: {
            room_chat_id: roomId
        }
    })

    return loadMessage;
}

const saveMessage = async(payload) => {
    return await chatModel.create(payload);
}


module.exports = {
    loadMessageByKostId, saveMessage
}