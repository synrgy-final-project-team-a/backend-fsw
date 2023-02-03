const RoomChatService = require("../services/RoomChatService");
const ChatService = require("../services/ChatService");
const UserService = require("../services/UserService");

const goToRoomChat = async(req, res)=>{
    const data = await UserService.getDetailUser({
        email: req.user.user_name,
        role: req.user.role,
    });

    if (req.user.role[0] != "ROLE_SK") {
        return res.status(403).json({
            status: 403,
            message: `Role User Adalah ${req.user.role[0]}, Hanya Pencari Kos yang bisa membuat room chat`
        })
    }

    const goToRoomChat = await RoomChatService.createRoomChat(data.data.id, req.body.kostId, req.user.role[0]);

    return res.status(goToRoomChat.status).json(goToRoomChat);
}

const loadMessageController = async(req, res) => {
    const loadMessage = await ChatService.loadMessageService(req.body.roomId);

    return res.status(loadMessage.code).json(loadMessage);
}

const loadRoomMessageController = async(req, res) => {
    const loadRoom = await RoomChatService.loadRoomChat(req.user.user_name, req.user.role[0])

    return res.status(loadRoom.status).json(loadRoom);
}

const getHeaderRoomChat = async(req, res) => {
    const loadHeader = await RoomChatService.getDetailRoomChat(req.user.user_name, req.user.role[0], req.body.roomId)

    return res.status(loadHeader.status).json(loadHeader);
}

module.exports = {goToRoomChat, loadMessageController, loadRoomMessageController, getHeaderRoomChat}