const { getAllUsers, GetUserById, createUser } = require("../controllers/UserController");
const express = require("express");
const auth = require("../middlewares/authorization");
const router = express.Router();
const bodyparser = require('body-parser');

var jsonParser = bodyparser.json()

router.get("/api/users/", auth.parseToken, auth.checkRole(["ROLE_SK"]), getAllUsers);
// router.get("/api/user/detail", parseToken, GetUserById);
router.get("/api/user/detail", GetUserById);
router.post("/api/user/create", jsonParser, createUser);

module.exports = router;
