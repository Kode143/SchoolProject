// Import necessary dependencies and models
import { Image } from "@/models/Image";
import { mongooseConnect } from "@/lib/mongoose";
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Handler function for deleteImage API endpoint
export default async function handle(req, res) {
  // Ensure it's a DELETE request
  if (req.method !== 'DELETE') {
    return res.status(405).end(); // Method Not Allowed
  }

  // Extract image ID and public ID from query parameters
  const { id, public_id } = req.query;

  try {
    // Delete image from Cloudinary
    await cloudinary.v2.uploader.destroy(public_id);

    // Delete image from MongoDB
    await mongooseConnect();
    await Image.deleteOne({ _id: id });

    // Respond with success message
    return res.status(200).json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
