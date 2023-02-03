const roomChat = require("../repositories/RoomChatRepository")

const createRoomChat = async(seekerId, kostId, tenantId) => {
    try {
        const cekRoom = await roomChat.cekRoom(seekerId, kostId);

        if (cekRoom !== null) {
            return {
                status: 200,
                message: "Going to room chat",
                data: cekRoom
            }
        }
        const payloadCreateRoomChat = {
            seekerId: seekerId,
            kostId: kostId,
            tenantId: tenantId
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
                data: {...room},
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

module.exports = {
    createRoomChat
}