const { getAllUsers, GetUserById, createUser } = require("../controllers/UserController");
const express = require("express");
const { parseToken } = require("../middlewares/authorization");
const router = express.Router();

router.get("/api/users/", parseToken, getAllUsers);
router.get("/api/user/detail", parseToken, GetUserById);
router.post("/api/user/create", createUser);

module.exports = router;
