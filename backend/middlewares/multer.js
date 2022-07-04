const path = require("path");
const multer = require("multer");
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

exports.upload = multer({ storage });