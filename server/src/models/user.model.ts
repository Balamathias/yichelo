import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import generateOtp from '../utils/generate-otp';
import dotenv from 'dotenv';

dotenv.config();

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
  emailVerificationOtp?: string;
  emailVerificationOtpExpire?: Date;
  resetPasswordOtp?: string;
  resetPasswordOtpExpire?: Date;
  sendVerificationOtp(): Promise<void>;
  sendResetPasswordOtp(): Promise<void>;
  resetPasswordWithOtp(otp: string, newPassword: string): Promise<boolean>;
  verifyEmailOtp(otp: string): Promise<boolean>;
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
  viewedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  purchasedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  emailVerificationOtp: { type: String },
  emailVerificationOtpExpire: { type: Date },
  resetPasswordOtp: { type: String },
  resetPasswordOtpExpire: { type: Date },
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

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

UserSchema.methods.sendVerificationOtp = async function () {
  const otp = generateOtp();
  this.emailVerificationOtp = otp;
  this.emailVerificationOtpExpire = new Date(Date.now() + 10 * 60 * 1000);
  await this.save();


  await transporter.sendMail({
    to: this.email,
    subject: 'Verify Your Email',
    text: `Your email verification OTP is: ${otp}`,
  });
};

UserSchema.methods.sendResetPasswordOtp = async function () {
  const otp = generateOtp();
  this.resetPasswordOtp = otp;
  this.resetPasswordOtpExpire = new Date(Date.now() + 10 * 60 * 1000);
  await this.save();

  await transporter.sendMail({
    to: this.email,
    subject: 'Reset Your Password',
    text: `Your password reset OTP is: ${otp}`,
  });
};

UserSchema.methods.resetPasswordWithOtp = async function (otp: string, newPassword: string): Promise<boolean> {
  if (
    this.resetPasswordOtp === otp &&
    this.resetPasswordOtpExpire &&
    this.resetPasswordOtpExpire > new Date()
  ) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(newPassword, salt);
    this.resetPasswordOtp = undefined;
    this.resetPasswordOtpExpire = undefined;
    await this.save();
    return true;
  }
  return false;
};

UserSchema.methods.verifyEmailOtp = async function (otp: string) {
  return this.emailVerificationOtp === otp && this.emailVerificationOtpExpire && this.emailVerificationOtpExpire > new Date();
}

export default mongoose.model<IUser>('User', UserSchema);
