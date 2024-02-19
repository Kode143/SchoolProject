
import { mongooseConnect } from "@/lib/mongoose";
import { Slider } from "@/models/slider";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST', 'DELETE'],
});

export default async function handle(req, res) {
  await new Promise((resolve, reject) => {
    cors(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

  const { method } = req;

  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === 'GET') {
    try {
        // Retrieve images from MongoDB
        const images = await Slider.find();

        // Check if images exist
        if (!images || images.length === 0) {
            return res.status(404).json({ error: 'No images found' });
        }

        // Send the images as a JSON response
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Error fetching images' });
    }
}

  
  if (method === 'POST') {
    try {
        // Extract images from the request body
        const { images } = req.body;

        // Ensure that images is an array and is not empty
        if (!Array.isArray(images) || images.length === 0) {
            console.error('Error: Invalid or empty images array');
            return res.status(400).json({ error: 'Invalid or empty images array' });
        }
        const imagesToSave = images.map(image => ({
            public_id: image.public_id,
            secure_url: image.secure_url
        }));
        // Create new image documents in MongoDB
       
        const createdImages = await Slider.create(imagesToSave);
    

        res.status(201).json(createdImages);
    } catch (error) {
        console.error('Error creating images:', error);
        res.status(500).json({ error: 'Error creating images' });
    }
}


  

if (method === 'DELETE') {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Missing image ID' });
    }

    const deletedImage = await Slider.deleteOne({ _id: id });

    if (deletedImage.deletedCount === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


}