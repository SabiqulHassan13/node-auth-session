const multer = require("multer");

// configure multer for file uploading
const UPLOAD_PATH = "./uploads/";
// const upload = multer({ dest: UPLOAD_PATH });

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExt = file.mimetype.split("/")[1];

    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExt);
  },
});

const upload = multer({ storage: multerStorage });

module.exports = { upload };
