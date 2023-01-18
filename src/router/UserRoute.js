const {
  getAllUsers,
  GetUserById,
  createUser,
  deleteUser
} = require("../controllers/UserController");
const express = require("express");
const auth = require("../middlewares/authorization");
const { validation } = require("../middlewares/validations");
const { 
  createUserValidation,
  deleteUserValidation
} = require("../middlewares/validations/userValidations");

const router = express.Router();

router.get(
    "/api/users/",
    auth.parseToken,
    auth.checkRole(["ROLE_SUPERUSER"]),
    getAllUsers
);
router.get("/api/user/detail", auth.parseToken, GetUserById);
router.post("/api/user/create", validation(createUserValidation),createUser);
router.delete(
  "/api/user/delete/:id", 
  auth.parseToken, 
  auth.checkRole(["ROLE_SUPERUSER"]),
  validation(deleteUserValidation),
  deleteUser
);

// router.get("/api/users/", getAllUsers);
// router.get("/api/user/detail", GetUserById);
// router.post("/api/user/create", createUser);


module.exports = router;
