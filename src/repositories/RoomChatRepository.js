const { sequelize } = require("../../db/models/index.js");
const models = require("../../db/models/index.js");
const roomChat = models.roomChat;

const createRoom = async (payload) => {
  return await roomChat.create(payload);
};

const cekRoom = async (userId, kostId, userRole) => {
  let room = [];

  if (userRole == "ROLE_SK") {
    room = await roomChat.findAll({
      where: {
        kost_id: kostId,
        seeker_id: userId,
      },
    });
  } else {
    room = await roomChat.findAll({
      where: {
        kost_id: kostId,
        tenant_id: userId,
      },
    });
  }

  return room[0];
};

const getUserRoomChats = async (userId, userRole) => {
  let rooms = [[], null];
  if (userRole == "ROLE_SK") {
    rooms = await sequelize.query(
      "SELECT rc.id as room_id, rc.seeker_id, rc.tenant_id, rc.kost_id, k.kost_name, k.city, k.address, k.front_building_photo as kost_photo_1, k.front_farbuilding_photo as kost_photo_2, k.front_road_photo as kost_photo_3, ab.message, ab.status_message, ab.created_at, ab.sender_id FROM room_chats rc " +
        "LEFT JOIN kost k ON k.kost_id = rc.kost_id " +
        "LEFT JOIN ( " +
        "SELECT * FROM chats ch WHERE (room_chat_id, id) IN (SELECT room_chat_id, MAX(id) FROM chats GROUP BY room_chat_id) ORDER BY created_at DESC " +
        ") ab ON (ab.room_chat_id = rc.id) " +
        `WHERE seeker_id = ${userId} AND ab.message IS NOT NULL`
    );
  } else if (userRole == "ROLE_TN") {
    rooms = await sequelize.query(
      "SELECT rc.id as room_id, rc.seeker_id, rc.tenant_id, rc.kost_id, k.kost_name, k.city, k.address, p.first_name as seeker_name, p.avatar as seeker_avatar, ab.message, ab.status_message, ab.created_at, ab.sender_id FROM room_chats rc " +
        "LEFT JOIN kost k ON k.kost_id = rc.kost_id " +
        "LEFT JOIN profile p ON p.id = rc.seeker_id " +
        "LEFT JOIN ( " +
        "SELECT * FROM chats ch WHERE (room_chat_id, id) IN (SELECT room_chat_id, MAX(id) FROM chats GROUP BY room_chat_id) ORDER BY created_at DESC " +
        ") ab ON (ab.room_chat_id = rc.id) " +
        `WHERE tenant_id = ${userId} AND ab.message IS NOT NULL`
    );
  }
  console.log(rooms);
  return rooms[0];
};

const getHeaderRoomChat = async (roomId, userRole) => {
  let headerRoom = [[], null];
  if (userRole == "ROLE_SK") {
    headerRoom = await sequelize.query(
      "SELECT rc.*, k.kost_name, k.city, k.address FROM room_chats rc  " +
        "LEFT JOIN kost k ON k.kost_id = rc.kost_id " +
        `WHERE rc.id = ${roomId}`
    );
  } else if (userRole == "ROLE_TN") {
    headerRoom = await sequelize.query(
      "SELECT rc.*, p.first_name as seeker_name, p.avatar as seeker_avatar, p.gender as seeker_gender, p.city as seeker_city FROM room_chats rc  " +
        "LEFT JOIN profile p ON p.id = rc.seeker_id " +
        `WHERE rc.id = ${roomId}`
    );
  }

  return headerRoom[0];
};

const getDetailRoomChats = async (roomId) => {
  const detailRoom = await sequelize.query(
    "SELECT rc.*, k.kost_name, k.city, k.address FROM room_chats rc  " +
      "LEFT JOIN kost k ON k.kost_id = rc.kost_id " +
      `WHERE rc.id = ${roomId}`
  );

  return detailRoom[0];
};

const refreshRoomChat = async (userId, userRole, roomId) => {
  let rooms = [[], null];
  if (userRole == "ROLE_SK") {
    rooms = await sequelize.query(
      "SELECT rc.id as room_id, rc.seeker_id, rc.tenant_id, rc.kost_id, k.kost_name, k.city, k.address, k.front_building_photo as kost_photo_1, k.front_farbuilding_photo as kost_photo_2, k.front_road_photo as kost_photo_3, ab.message, ab.status_message, ab.created_at FROM room_chats rc " +
        "LEFT JOIN kost k ON k.kost_id = rc.kost_id " +
        "LEFT JOIN ( " +
        "SELECT * FROM chats ch WHERE (room_chat_id, id) IN (SELECT room_chat_id, MAX(id) FROM chats GROUP BY room_chat_id) ORDER BY created_at DESC " +
        ") ab ON (ab.room_chat_id = rc.id) " +
        `WHERE seeker_id = ${userId} AND rc.id = ${roomId}`
    );
  } else if (userRole == "ROLE_TN") {
    rooms = await sequelize.query(
      "SELECT rc.id as room_id, rc.seeker_id, rc.tenant_id, rc.kost_id, k.kost_name, k.city, k.address, p.first_name as seeker_name, p.avatar as seeker_avatar, ab.message, ab.status_message, ab.created_at FROM room_chats rc " +
        "LEFT JOIN kost k ON k.kost_id = rc.kost_id " +
        "LEFT JOIN profile p ON p.id = rc.seeker_id " +
        "LEFT JOIN ( " +
        "SELECT * FROM chats ch WHERE (room_chat_id, id) IN (SELECT room_chat_id, MAX(id) FROM chats GROUP BY room_chat_id) ORDER BY created_at DESC " +
        ") ab ON (ab.room_chat_id = rc.id) " +
        `WHERE tenant_id = ${userId} AND rc.id = ${roomId}`
    );
  }

  return rooms[0][0];
};

const findRoomById = async (roomId) => {
  return roomChat.findByPk(roomId);
};

module.exports = {
  createRoom,
  cekRoom,
  getUserRoomChats,
  findRoomById,
  getDetailRoomChats,
  getHeaderRoomChat,
  refreshRoomChat,
};
