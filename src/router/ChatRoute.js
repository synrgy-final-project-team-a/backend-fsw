const {
  goToRoomChat,
  loadMessageController,
  loadRoomMessageController,
  getHeaderRoomChat,
  sendMessage,
  getRoomChat
} = require("../controllers/chatController");
const express = require("express");
const auth = require("../middlewares/authorization");
const { validation } = require("../middlewares/validations");
const {
  goToRoomChatValidation,
  loadChatValidation,
} = require("../middlewares/validations/chatValidations");

const router = express.Router();

router.post(
  "/api/chat",
  auth.parseToken,
  validation(goToRoomChatValidation),
  goToRoomChat
);

router.post(
  "/api/chat/load-chat",
  auth.parseToken,
  validation(loadChatValidation),
  loadMessageController
);

router.get("/api/chat/load-room", auth.parseToken, loadRoomMessageController);

router.post(
  "/api/chat/load-room-header",
  auth.parseToken,
  validation(loadChatValidation),
  getHeaderRoomChat
);
router.post("/api/chat/send-message", sendMessage);

module.exports = router;
