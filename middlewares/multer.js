const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary")

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "movie-posters",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 500, height: 750, crop: "limit" }],
  },
});

const upload = multer({ storage });

module.exports = upload;
