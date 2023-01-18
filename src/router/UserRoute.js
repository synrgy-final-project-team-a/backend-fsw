const {
  getAllUsers,
  GetUserById,
  createUser,
  deleteUser
} = require("../controllers/UserController");
const express = require("express");
const auth = require("../middlewares/authorization");
const { validation } = require("../middlewares/validations");
<<<<<<< HEAD
const {
  createUserValidation,
} = require("../middlewares/validations/userValidations");
const multerUpload = require("../utils/multer");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});
=======
const { 
  createUserValidation,
  deleteUserValidation
} = require("../middlewares/validations/userValidations");
>>>>>>> 9a89ae07e37479014b1235f4b7335ffa784ed922

const router = express.Router();

router.get(
  "/api/users/",
  auth.parseToken,
  auth.checkRole(["ROLE_SUPERUSER"]),
  getAllUsers
);
router.get("/api/user/detail", auth.parseToken, GetUserById);
router.post(
  "/api/user/create",
  // validation(createUserValidation),
  upload.single("avatar"),
  createUser)
  
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
