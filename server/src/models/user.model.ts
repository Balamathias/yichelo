import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  roles: ('customer' | 'seller' | 'admin') [];
  firstName?: string;
  lastName?: string;
  comparePassword(password: string): Promise<boolean>;
  viewedProducts: mongoose.Types.ObjectId[];
  purchasedProducts: mongoose.Types.ObjectId[];
  verified?: boolean;
  phone?: string;
  token?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: false, unique: true },
  phone: { type: String, required: false },
  roles: { type: [String], default: ['customer'] },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  verified: { type: Boolean, default: false },
  token: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
  viewedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  purchasedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, 
{ timestamps: true });

UserSchema.pre('save', async function (next) {
  const user = (this as any) as IUser;
  if (!user.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
