const { getAllUsers, GetUserById } = require("../controllers/UserController");
const express = require("express");
const { parseToken } = require("../middlewares/authorization");
const router = express.Router();

router.get("/api/users/", parseToken, getAllUsers);
router.get("/api/user/detail", parseToken, GetUserById);
module.exports = router;
