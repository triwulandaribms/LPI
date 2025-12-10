const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (!file.mimetype.includes("jpeg") && !file.mimetype.includes("jpg")) {
    return cb(new Error("Format harus jpg/jpeg"), false);
  }
  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 300 * 1024 }, // 300KB
});

module.exports = upload;
