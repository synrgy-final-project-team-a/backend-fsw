const {
    goToRoomChat
} = require("../controllers/chatController");
const express = require("express");
const auth = require("../middlewares/authorization");
const { validation } = require("../middlewares/validations");
const {
    goToRoomChat, goToRoomChatValidation
} = require("../middlewares/validations/chatValidations");


router.get(
    "/api/chat/",
    auth.parseToken,
    validation(goToRoomChatValidation),
    goToRoomChat
  );

const router = express.Router();