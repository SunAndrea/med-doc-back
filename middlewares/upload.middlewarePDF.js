const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "files",
    resource_type: "raw",
    // resource_type: "auto",
    // transformation: [
    //   { width: 1000, quality: "auto" },
    //   { flags: "lossy", fetch_format: "auto", quality: 70},
    // ],
  },
  allowedFormats: ["pdf"],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadCloudPDF = multer({ storage });

module.exports = uploadCloudPDF;
