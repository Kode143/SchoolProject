import mongoose, { model, Schema, models } from "mongoose";

const ImageSchema = new Schema({
 
    public_id: { type: String, required: true },
    secure_url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
 

});

export const Image = models.Image || model('Image', ImageSchema);