const { sequelize, Sequelize } = require("../../db/models/index.js");
const models = require("../../db/models/index.js");
const roomchats = require("../../db/models/roomchats.js");
const roomChat = models.roomChat;

const createRoom = async(payload) => {
    return await roomChat.create(payload);
}

const cekRoom = async(userId, kostId, userRole) => {
    let room = [];

    if (userRole == "ROLE_SK") {
        room = await roomChat.findAll({
            where: {
                kost_id : kostId,
                seeker_id : userId
            }
        })
    } else {
        room = await roomChat.findAll({
            where: {
                kost_id : kostId,
                tenant_id : userId
            }
        })
    }

    console.log(room);

    return room[0];
}

const getUserRoomChats = async(userId, userRole) => {
    let rooms = [];
    if (userRole == "ROLE_SK") {
        rooms = roomChat.findAll({
            where: {
                seeker_id: userId
            }
        });
    } else if (userRole == "ROLE_TN") {
        rooms = roomChat.findAll({
            where: {
                tenant_id: userId
            }
        });
    }

    return rooms;
}

const findRoomById = async(roomId) => {
    return roomChat.findByPk(roomId);
}

module.exports = {
    createRoom, cekRoom, getUserRoomChats, findRoomById
}