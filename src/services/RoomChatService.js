const roomChatRepository = require("../repositories/RoomChatRepository")
const kost = require("../repositories/KostRepository")
const userService = require("./UserService");

const createRoomChat = async(seekerId, kostId, userRole) => {
    try {
        const cekRoom = await roomChatRepository.cekRoom(seekerId, kostId, userRole);

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

const loadRoomChat = async(email, userRole) => {
    try {
        const userDetail = await userService.getDetailUser({email: email, role:userRole});
        if (userDetail.status != 200) {
            return userDetail;
        }
        const getUserRoomChats = await roomChatRepository.getUserRoomChats(userDetail.data.id, userRole);

        return {
            status: 200,
            message: getUserRoomChats.length == 0 ? "Belum ada pesan" : "Berhasil mendapatkan riwayat room chat",
            data: getUserRoomChats
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error",
            data: null
        }
    }
}

const getDetailRoomChat = async(email, userRole, roomId) => {
    try {
        const userDetail = await userService.getDetailUser({email: email, role:userRole});
        if (userDetail.status != 200) {
            return userDetail;
        }
        console.log(userDetail);
        const roomChat = await roomChatRepository.getDetailRoomChats(roomId);
        console.log(roomChat);
    
        if (userRole == "ROLE_SK" && userDetail.data.id != roomChat[0].seeker_id) {
            return {
                status: 401,
                message: "User Not Authorized",
                data: null
            }
        } else if (userRole == "ROLE_TN" && userDetail.data.id != roomChat[0].tenant_id) {
            return {
                status: 401,
                message: "User Not Authorized",
                data: null
            }
        }
        
        return {
            status: 200,
            message: "Berhail Get Detail Room",
            data: roomChat[0]
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error",
            data: null
        }
    }
}


module.exports = {
    createRoomChat, joinRoomChat, loadRoomChat, getDetailRoomChat
}