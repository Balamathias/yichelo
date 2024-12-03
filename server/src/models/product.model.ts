import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  features: string[];
  stock: number;
  category: Types.ObjectId;
  tags?: string[];
  rating?: number;
  badge?: string;
  colors?: strring[],
  sizes?: string[]
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  features: { type: [String] },
  colors: { type: [String], default: [] },
  sizes: { type: [String], default: [] },
  stock: { type: Number, default: 0 },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  tags: { type: [String], default: [] },
  rating: { type: Number, default: 0 },
  badge: { type: String, required: false },
}, { timestamps: true });

ProductSchema.index({ name: 'text', description: 'text' });

export default mongoose.model<IProduct>('Product', ProductSchema);
