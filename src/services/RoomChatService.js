const roomChatRepository = require("../repositories/RoomChatRepository");
const kostRepository = require("../repositories/KostRepository");
const chatRepository = require("../repositories/ChatRepository");
const userService = require("./UserService");
const {jwt, decodeToken} = require("../utils/tools");

const createRoomChat = async (seekerId, kostId, userRole) => {
  try {
    const cekRoom = await roomChatRepository.cekRoom(
      seekerId,
      kostId,
      userRole
    );

    if (cekRoom !== undefined) {
      return {
        status: 200,
        message: "Going to room chat",
        data: { ...cekRoom.dataValues, room_id: cekRoom.dataValues.id },
      };
    }

    const getTenantId = await kostRepository.getKostByKostId(kostId);

    const payloadCreateRoomChat = {
      seeker_id: seekerId,
      kost_id: kostId,
      tenant_id: getTenantId.profile_id,
    };

    const room = await roomChatRepository.createRoom(payloadCreateRoomChat);

    if (!room) {
      return {
        status: 400,
        message: "Failed to chat",
        data: null,
      };
    } else {
      return {
        status: 200,
        message: "Going to room chat",
        data: { ...room.dataValues, room_id: room.dataValues.id },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const joinRoomChat = async (data) => {
  try {
    const decoded = await jwt.verify(data.token, "s3cr3t");

    if (decoded == null) {
      return {
        code: 401,
        message: "Unautorized access",
        data: null,
      };
    } else {
      // const detailUser = await userService.getDetailUser({email: decoded.user_name, role:decoded.role[0]});
      const detailRoomChat = await getDetailRoomChat({
        email: decoded.user_name,
        userRole: decoded.authorities[0],
        roomId: data.roomId,
      });

      console.log(detailRoomChat);
      if (detailRoomChat.data.role_user == "ROLE_SK") {
        await chatRepository.updateStatusMessage(data.roomId, detailRoomChat.data.tenant_id);
      } else if (detailRoomChat.data.role_user == "ROLE_TN") {
        await chatRepository.updateStatusMessage(data.roomId, detailRoomChat.data.seeker_id);
      }

      return detailRoomChat;
    }
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      message: "Token Invalid",
      data: null,
    };
  }
};

const loadRoomChat = async (email, userRole) => {
  try {
    const userDetail = await userService.getDetailUser({
      email: email,
      role: userRole,
    });
    if (userDetail.status != 200) {
      return userDetail;
    }
    const getUserRoomChats = await roomChatRepository.getUserRoomChats(
      userDetail.data.id,
      userRole
    );

    return {
      status: 200,
      message:
        getUserRoomChats.length == 0
          ? "Belum ada pesan"
          : "Berhasil mendapatkan riwayat room chat",
      data: getUserRoomChats,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
};

const getDetailRoomChat = async ({ email, userRole, roomId }) => {
  try {
    const userDetail = await userService.getDetailUser({
      email: email,
      role: userRole,
    });
    if (userDetail.status != 200) {
      return userDetail;
    }

    const roomChat = await roomChatRepository.getDetailRoomChats(roomId);


    if (userRole == "ROLE_SK" && userDetail.data.id != roomChat[0].seeker_id) {
      return {
        status: 401,
        message: "User Not Authorized",
        data: null,
      };
    } else if (
      userRole == "ROLE_TN" &&
      userDetail.data.id != roomChat[0].tenant_id
    ) {
      return {
        status: 401,
        message: "User Not Authorized",
        data: null,
      };
    }

    const output = { ...roomChat[0], role_user: userRole };
    
    return {
      status: 200,
      message: "Berhail Get Detail Room",
      data: output ,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
};

const joinNotif = async (data) => {
  try {
    const decoded = await jwt.verify(data.token, "s3cr3t");
    console.log(decoded);
    if (decoded == null) {
      return {
        code: 401,
        message: "Unautorized access",
        data: null,
      };
    } else {
      const detailUser = await userService.getDetailUser({
        email: decoded.user_name,
        role: decoded.authorities[0],
      });
      return {
        status: 200,
        message: "succsess",
        data: detailUser.data,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      message: "Token Invalid",
      data: null,
    };
  }
};

const loadRoomChatBySocket = async(data) => {
  const decodeResult = await decodeToken(data.sender);
  if (decodeResult == null) {
    return {
      code: 401,
      message: "Unautorized access",
      data: null,
    };
  } else {
    return await loadRoomChat(decodeResult.user_name, decodeResult.authorities[0]);
  }
};

const refreshRoomChatBySocket = async(userId, userRole, roomId) => {
  try {
    const refreshRoomChat = await roomChatRepository.refreshRoomChat(userId, userRole, roomId);
  
    if (!refreshRoomChat) {
      return {
        status: 101,
        message: "failed refresh message",
        data: null,
      };
    } else {
      return {
        status: 200,
        message: "success send message",
        data: {...refreshRoomChat},
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
};

const getHeaderRoomChat = async (email, userRole, roomId) => {
  try {
    const userDetail = await userService.getDetailUser({
      email: email,
      role: userRole,
    });
    if (userDetail.status != 200) {
      return userDetail;
    }

    const roomChat = await roomChatRepository.getHeaderRoomChat(roomId, userRole);


    if (userRole == "ROLE_SK" && userDetail.data.id != roomChat[0].seeker_id) {
      return {
        status: 401,
        message: "User Not Authorized",
        data: null,
      };
    } else if (
      userRole == "ROLE_TN" &&
      userDetail.data.id != roomChat[0].tenant_id
    ) {
      return {
        status: 401,
        message: "User Not Authorized",
        data: null,
      };
    }

    const output = { ...roomChat[0], role_user: userRole };
    
    return {
      status: 200,
      message: "Berhail Get Detail Room",
      data: output ,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
};

module.exports = {
  createRoomChat,
  joinRoomChat,
  loadRoomChat,
  getDetailRoomChat,
  joinNotif,
  loadRoomChatBySocket,
  getHeaderRoomChat,
  refreshRoomChatBySocket
};
