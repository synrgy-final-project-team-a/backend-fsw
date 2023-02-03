const roomChat = require("../repositories/RoomChatRepository")
const kost = require("../repositories/KostRepository")

const createRoomChat = async(seekerId, kostId, userRole) => {
    try {
        console.log("seeker id");
        console.log(seekerId);
        const cekRoom = await roomChat.cekRoom(seekerId, kostId, userRole);
        console.log("room");
        console.log(cekRoom);

        if (cekRoom !== undefined) {
            return {
                status: 200,
                message: "Going to room chat",
                data: {...cekRoom.dataValues, room_id: cekRoom.dataValues.id}
            }
        }

        const getTenantId = await kost.getKostByKostId(kostId);

        const payloadCreateRoomChat = {
            seeker_id: seekerId,
            kost_id: kostId,
            tenant_id: getTenantId.profile_id
        }

        const room = await roomChat.createRoom(payloadCreateRoomChat);

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
                data: {...room.dataValues, room_id:room.dataValues.id},
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
}

const joinRoomChat = async(tokenUser) => {
    try {
        const decoded = await jwt.verify(tokenUser, process.env.TOKEN_SECRET);
    
        if (decoded == null) {
          return {
            code: 401,
            message: "Unautorized access",
            data: null
          };
        } else {
            return await userService.getDetailUser({email: decoded.user_name, role:decoded.role[0]});
        }
    } catch (error) {
        console.log(error);
        return {
            code: 500,
            message: "Token Invalid",
            data: null
        }
    }
}



module.exports = {
    createRoomChat, joinRoomChat
}