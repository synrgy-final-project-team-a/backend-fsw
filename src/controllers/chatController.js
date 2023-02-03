const RoomChatService = require("../services/RoomChatService");
const UserService = require("../services/UserService");

const goToRoomChat = async(req, res)=>{
    const data = await UserService.getDetailUser({
        email: req.user.user_name,
        role: req.user.role,
    });

    const goToRoomChat = await RoomChatService.createRoomChat(data.id, req.body.kostId);

    return res.status(goToRoomChat.status).json(goToRoomChat);
}

module.exports = {goToRoomChat}