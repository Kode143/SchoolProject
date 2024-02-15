import multiparty from 'multiparty';
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handle(req, res) {
  try {
    await mongooseConnect();
    await isAdminRequest(req, res);

    const form = new multiparty.Form();

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

    console.log('Files parsed from request:', files);

    const uploads = [];

    for (const file of files.file) {
      const result = await cloudinary.v2.uploader.upload(file.path);
      uploads.push({
        public_id: result.public_id,
        secure_url: result.secure_url
      });
    }

    return res.json({ uploads });
  } catch (error) {
    console.error('Error uploading files:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const config = {
  api: { bodyParser: false },
};
