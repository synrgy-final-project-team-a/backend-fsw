const {getAllUsers} = require("../controllers/UserController");
const express = require("express");
const auth = require("../middlewares/authorization");
const router = express.Router();

router.get("/api/users/", auth.parseToken, auth.checkRole(["ROLE_SUPERUSER"]), getAllUsers);

module.exports = router;