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
    let rooms = [[],null];
    if (userRole == "ROLE_SK") {
        rooms = await sequelize.query(
            "SELECT rc.*, k.kost_name, k.city, k.address, k.front_building_photo as kost_photo_1, k.front_farbuilding_photo as kost_photo_2, k.front_road_photo as kost_photo_3 FROM room_chats rc " +
            "LEFT JOIN kost k ON k.kost_id = rc.kost_id " +
            `WHERE seeker_id = ${userId}`
        );
    } else if (userRole == "ROLE_TN") {
        rooms = await sequelize.query(
            "SELECT rc.*, k.kost_name, k.city, k.address, p.first_name as seeker_name, p.avatar as seeker_avatar FROM room_chats rc " +
            "LEFT JOIN kost k ON k.kost_id = rc.kost_id " +
            "LEFT JOIN profile p ON p.id = rc.seeker_id " +
            `WHERE tenant_id = ${userId}`
        );
    }

    return rooms[0];
}

const getDetailRoomChats = async(roomId) => {
    detailRoom = await sequelize.query(
        "SELECT rc.*, k.kost_name, k.city, k.address FROM room_chats rc " +
        "LEFT JOIN kost k ON k.kost_id = rc.kost_id " +
        `WHERE rc.id = ${roomId}`
    );

    return detailRoom[0];
}

const findRoomById = async(roomId) => {
    return roomChat.findByPk(roomId);
}

module.exports = {
    createRoom, cekRoom, getUserRoomChats, findRoomById, getDetailRoomChats
}