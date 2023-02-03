const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userService = require("./UserService")
const chatRepository = require("../repositories/ChatRepository");

const sendChat = async(data) => {
    const decoded = await jwt.verify(data.user, process.env.TOKEN_SECRET);

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

const loadMessageService = async(roomId) => {
    const messages = await chatRepository.loadMessageByKostId(roomId);
    console.log(messages);

    return {
        code: 200,
        message: messages.length == 0 ? "Belum Ada Pesan" : "Berhasil Mendapatkan Riwayat Pesan",
        data: messages
    }
}

module.exports = {sendChat, loadMessageService}