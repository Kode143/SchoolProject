import mongoose, { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({
  secure_url: { type: String, required: true },
  public_id: { type: String, required: true }
});

const SliderSchema = new Schema({
  title: { type: String, required: true },
  images: [ImageSchema], 
  description:{ type: String, required: true },
});

export const Slider = models.Slider || model('Slider', SliderSchema);
