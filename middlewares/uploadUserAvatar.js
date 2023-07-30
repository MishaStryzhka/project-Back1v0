const multer = require('multer');
const path = require('path');

const tempDestination = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
  destination: tempDestination,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadUserAvatar = multer({
  storage: multerConfig,
});

module.exports = uploadUserAvatar;
