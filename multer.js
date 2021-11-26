const multer = require("multer");

const storage = multer.diskStorage({
  destination: (res, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + file.originalname);
  }
})

const upload = multer({
  storage,
});

module.exports = upload;