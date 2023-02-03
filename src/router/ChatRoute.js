const {
    goToRoomChat, loadMessageController, loadRoomMessageController
} = require("../controllers/chatController");
const express = require("express");
const auth = require("../middlewares/authorization");
const { validation } = require("../middlewares/validations");
const {
    goToRoomChatValidation, loadChatValidation
} = require("../middlewares/validations/chatValidations");

const router = express.Router();

router.post(
    "/api/chat",
    auth.parseToken,
    validation(goToRoomChatValidation),
    goToRoomChat
);

router.post(
    "/api/load-chat",
    auth.parseToken,
    validation(loadChatValidation),
    loadMessageController
);

router.get(
    "/api/load-room",
    auth.parseToken,
    loadRoomMessageController
);

module.exports = router;