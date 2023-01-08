const { getAllUsers, GetUserById } = require("../controllers/UserController");
const express = require("express");
const router = express.Router();

router.get("/api/users/", getAllUsers);
router.get("/api/user", GetUserById);
module.exports = router;
