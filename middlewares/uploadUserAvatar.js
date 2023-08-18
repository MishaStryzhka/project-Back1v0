const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine the folder based on file properties or request data
    let folder;

    const userID = req.user._id.toString();

    const uniqueImgName = `${userID}_${file.originalname}`;

    if (file.fieldname === 'avatar') {
      folder = 'DentistPortal_Avatars';
    } else if (file.fieldname === 'certificate') {
      folder = 'DentistPortal_Certificates';
    } else {
      folder = 'misc';
    }
    return {
      folder: folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // Adjust the allowed formats as needed
      public_id: uniqueImgName, // Use original filename as the public ID
      // transformation: [
      //   { width: 350, height: 350 },
      //   { width: 700, height: 700 },
      // ],
    };
  },
});

const uploadUserAvatar = multer({ storage });

module.exports = uploadUserAvatar;
