import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description?: string;
  thumbnail?: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model<ICategory>('Category', CategorySchema);
