const { getAllUsers, GetUserById, createUser } = require("../controllers/UserController");
const express = require("express");
const auth = require("../middlewares/authorization");
const router = express.Router();

router.get("/api/users/", auth.parseToken, auth.checkRole(["ROLE_SUPERUSER"]), getAllUsers);
router.get("/api/user/detail", parseToken, GetUserById);
router.post("/api/user/create", createUser);

module.exports = router;
