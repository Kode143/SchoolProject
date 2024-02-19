import mongoose, { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({
  secure_url: { type: String, required: true },
  public_id: { type: String, required: true }
});

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  images: [ImageSchema], 
  description:{ type: String, required: true },
});

export const Article = models.Article || model('Article', ArticleSchema);
