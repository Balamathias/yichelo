import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICartProduct {
  productId: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user: Types.ObjectId;
  products: ICartProduct[];
  totalPrice: number;
}

const CartSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, default: 1 },
    }
  ],
  totalPrice: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model<ICart>('Cart', CartSchema);
