// const multer = require('multer')
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + file.originalname
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

// const upload = multer({ storage: storage })

// module.exports=upload







const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "G55uploads",
    resource_type: "auto",
    public_id: Date.now() + "-" + file.originalname,
  }),
});

// Multer
const uploads = multer({ storage });

module.exports = { uploads, cloudinary };