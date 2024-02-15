// api/notices.js


import { mongooseConnect } from '@/lib/mongoose';
import Notice from '@/models/notice';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    await mongooseConnect();
    try {
      const { noticeType, textNotice, imageNotice } = req.body;

      // Create a new notice instance
      const newNotice = new Notice({
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
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
