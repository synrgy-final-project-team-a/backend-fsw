const {
  getAllUsers,
  GetUserById,
  createUser,
} = require("../controllers/UserController");
const express = require("express");
const auth = require("../middlewares/authorization");
const { validation } = require("../middlewares/validations");
const { createUserValidation } = require("../middlewares/validations/userValidations");

const router = express.Router();

router.get(
    "/api/users/",
    auth.parseToken,
    auth.checkRole(["ROLE_SUPERUSER"]),
    getAllUsers
);
router.get("/api/user/detail", auth.parseToken, GetUserById);
router.post("/api/user/create", validation(createUserValidation),createUser);

// router.get("/api/users/", getAllUsers);
// router.get("/api/user/detail", GetUserById);
// router.post("/api/user/create", createUser);


module.exports = router;
