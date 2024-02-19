import { mongooseConnect } from '@/lib/mongoose';
import { Article } from '@/models/article';


export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        const events = await Article.find();
        res.json(events);
    }

    if (method === 'POST') {
        const { title, images, description } = req.body;
        const eventDoc = await Article.create({
            title,
            images,
            description
        });
        res.json(eventDoc);
    }

    if (method === 'DELETE') {
        const { id } = req.query; 
        if (!id) {
          return res.status(400).json({ error: 'Missing event ID' });
        }
        await Article.deleteOne({ _id: id });
        return res.json({ success: true });
      }
      
    
}