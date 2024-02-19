import { mongooseConnect } from '@/lib/mongoose';
import Notice from '@/models/notice';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await mongooseConnect();
    try {
      const { title, noticeType, textNotice, images} = req.body;

      // Create a new notice instance
      const newNotice = new Notice({
        title,
        noticeType,
        textNotice,
        images,
      });

      // Save the notice to the database
      const savedNotice = await newNotice.save();

      res.status(201).json({ success: true, notice: savedNotice });
    } catch (error) {
      console.error('Error saving notice:', error);
      res.status(500).json({ success: false, error: 'Error saving notice' });
    }
  } else if (req.method === 'GET') {
    await mongooseConnect();
    try {
      const notices = await Notice.find({});
      res.status(200).json(notices);
    } catch (error) {
      console.error('Error fetching notices:', error);
      res.status(500).json({ success: false, error: 'Error fetching notices' });
    }
  } else if (req.method === 'DELETE') {
    await mongooseConnect();
    try {
      const { id } = req.query; // Use req.query to get the notice ID from the URL query parameter
      const deletedNotice = await Notice.findByIdAndDelete(id);
      
      if (!deletedNotice) {
        return res.status(404).json({ success: false, error: 'Notice not found' });
      }
      
      // Delete the images associated with the notice from Cloudinary
      // Implement this part based on your Cloudinary integration
      
      res.status(200).json({ success: true, message: 'Notice deleted successfully' });
    } catch (error) {
      console.error('Error deleting notice:', error);
      res.status(500).json({ success: false, error: 'Error deleting notice' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
