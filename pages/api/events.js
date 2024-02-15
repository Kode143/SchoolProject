import { mongooseConnect } from '@/lib/mongoose';
import { Event } from '@/models/event';

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        const events = await Event.find();
        res.json(events);
    }

    if (method === 'POST') {
        const { title, date, images, description } = req.body;
        const eventDoc = await Event.create({
            title,
            date,
            images,
            description
        });
        res.json(eventDoc);
    }

    if (method === 'DELETE') {
        const { id } = req.query; // Destructure id from req.query
        if (!id) {
          return res.status(400).json({ error: 'Missing event ID' });
        }
        await Event.deleteOne({ _id: id }); // Use id to delete the event
        return res.json({ success: true });
      }
      
    
}