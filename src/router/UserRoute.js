const {getAllUsers} = require("../controllers/UserController");
const express = require("express");
const router = express.Router();

router.get("/api/users/", getAllUsers);

module.exports = router;