const { sequelize, Sequelize } = require("../../db/models/index.js");
const models = require("../../db/models/index.js");
const roomChat = models.roomChat;

const createRoom = async(payload) => {
    return await roomChat.create(payload);
}

const cekRoom = async(seekerId, kostId) => {
    const [result, meatada] = await sequelize.query(
        "SELECT * FROM room_chats as r " +
          `WHERE r.kost_id = ${kostId} AND r.seekerId = ${seekerId} `
    );

    return result[0];
}

module.exports = {
    createRoom, cekRoom
}