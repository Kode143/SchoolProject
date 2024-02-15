import mongoose, { model, Schema, models } from "mongoose";

const EventSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true},
  images: [{ type: String }],
  description: String,
});

export const Event = models.Event || model('Event', EventSchema);
