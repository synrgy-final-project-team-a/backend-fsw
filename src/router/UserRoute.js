const { getAllUsers, GetUserById } = require("../controllers/UserController");
const express = require("express");
const auth = require("../middlewares/authorization");
const router = express.Router();


router.get(
  "/api/users/",
  auth.parseToken,
  auth.checkRole(["ROLE_SUPERUSER"]),
  getAllUsers
);
router.get("/api/user/detail", auth.parseToken, GetUserById);


module.exports = router;