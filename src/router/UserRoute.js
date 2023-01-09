const { getAllUsers, GetUserById, createUser } = require("../controllers/UserController");
const express = require("express");
const router = express.Router();

router.get("/api/users/", getAllUsers);
router.get("/api/user", GetUserById);
router.post("/api/user/create", createUser);
module.exports = router;
