const multer = require("multer");

const multerStorage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const multerUpload = multer({ storage: multerStorage }).single("avatar");

exports.module = { multerUpload };
