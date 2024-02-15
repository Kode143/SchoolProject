// controllers/imageController.js

const cloudinary = require('cloudinary').v2;
const Image = require('@/models/Image');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, { folder: 'my-uploads' }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const saveImageToDatabase = async (imageInfo) => {
  const { secure_url, public_id } = imageInfo;
  const newImage = new Image({
    url: secure_url,
    public_id,
  });
  return newImage.save();
};

module.exports = { uploadImage, saveImageToDatabase };
