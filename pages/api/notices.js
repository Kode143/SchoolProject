import { mongooseConnect } from '@/lib/mongoose';
import Notice from '@/models/notice';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await mongooseConnect();
    try {
      const { title, noticeType, textNotice, imageNotice } = req.body;

      // Create a new notice instance
      const newNotice = new Notice({
        title,
        noticeType,
        textNotice,
        imageNotice,
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
      const { id } = req.body;
      await Notice.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: 'Notice deleted successfully' });
    } catch (error) {
      console.error('Error deleting notice:', error);
      res.status(500).json({ success: false, error: 'Error deleting notice' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
