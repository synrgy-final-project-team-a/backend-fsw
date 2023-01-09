const {getAllUsers} = require("../controllers/UserController");
const express = require("express");
const { parseToken } = require("../middlewares/authorization");
const router = express.Router();

router.get("/api/users/", parseToken, getAllUsers);

module.exports = router;