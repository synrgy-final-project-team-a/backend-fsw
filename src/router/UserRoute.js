const { getAllUsers, GetUserById, createUser } = require("../controllers/UserController");
const express = require("express");
const auth = require("../middlewares/authorization");
const bodyparser = require('body-parser');

const router = express.Router();
var jsonParser = bodyparser.json()

// router.get(
//     "/api/users/",
//     auth.parseToken,
//     auth.checkRole(["ROLE_SUPERUSER"]),
//     getAllUsers
// );
// router.get("/api/user/detail", auth.parseToken, GetUserById);
// router.post("/api/user/create", jsonParser, auth.parseToken, createUser);

router.get("/api/users/", getAllUsers);
router.get("/api/user/detail", GetUserById);
router.post("/api/user/create", jsonParser, createUser);


module.exports = router;
