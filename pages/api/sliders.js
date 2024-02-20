import { mongooseConnect } from '@/lib/mongoose';
import { Slider } from '@/models/slider';

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        const sliders = await Slider.find();
        res.json(sliders);
    }

    if (method === 'POST') {
        const { title, images, description } = req.body;
        const eventDoc = await Slider.create({
            title,
            images,
            description
        });
        res.json(eventDoc);
    }

    if (method === 'DELETE') {
        const { id } = req.query; // Destructure id from req.query
        if (!id) {
          return res.status(400).json({ error: 'Missing slider ID' });
        }
        await Slider.deleteOne({ _id: id });
        return res.json({ success: true });
      }
      
    
}