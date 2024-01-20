const multer = require("multer")
const path = require('path')
var fs = require('fs');

const storageEngine = multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
exports.upload = multer({
  storage: storageEngine,
  limits: {fileSize: 20000000}
}).single('image')