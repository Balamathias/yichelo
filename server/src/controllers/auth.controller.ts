import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../config';

const generateAccessToken = (userId: string, roles?: string[]) => {
  return jwt.sign({ userId, roles }, JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (userId: string, roles?: string[]) => {
  return jwt.sign({ userId, roles }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

const generateAndSetTokens = (res: Response, user: IUser) => {
  const accessToken = generateAccessToken(user._id?.toString() || '', user?.roles);
  const refreshToken = generateRefreshToken(user._id?.toString() || '', user?.roles);

  res.cookie('accessToken', accessToken, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'none', 
    path: '/'
  });
  
  res.cookie('refreshToken', refreshToken, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'none', 
    path: '/'
  });

  return { accessToken, refreshToken };
};

export const register = async (req: Request, res: Response) => {
  const { username, email, password, phone } = req.body;

  if (!username || !email || !password) return res.status(400).json({ message: 'Please fill in all fields' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use, please login if you own this account.' });

    const user = new User({ username, email, password, phone });
    await user.save();

    const data = generateAndSetTokens(res, user);

    res.status(201).json({ message: 'Account created successfully', data });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error?.message, error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password, rememberMe } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    user.lastLogin = new Date();
    user.rememberMe = Boolean(rememberMe);
    await user.save();
    
    const data = generateAndSetTokens(res, user);
    
    res.status(200).json({ message: 'Logged in successfully', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};

export const refreshTokens = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ message: 'Refresh token missing' });

  try {
    const decoded: any = jwt.verify(token, JWT_REFRESH_SECRET);
    const user = await User.findById(decoded?.userId);

    if (!user) return res.status(403).json({ message: 'Forbidden' });

    const data = generateAndSetTokens(res, user);

    res.json({ message: 'Tokens refreshed successfully', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const me = async (req: Request, res: Response) => {
  console.log(req)
  try {
    if (!req?.user) return res.status(403).json({ message: 'Forbidden' });

    res.json({ data: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const sendVerificationOtpHandler = async (req: Request, res: Response) => {
  const user = await User.findById(req?.user?._id);
  if (!user) return res.status(404).send('User not found');

  await user.sendVerificationOtp();
  res.status(200).send('Verification OTP sent to email');
};

export const verifyEmailHandler = async (req: Request, res: Response) => {
  const { otp } = req.body;
  const user = await User.findById(req?.user?._id);
  if (!user) return res.status(404).send('User not found');

  const isVerified = await user.verifyEmailOtp(otp);
  if (!isVerified) return res.status(400).send('Invalid or expired OTP');

  const data = generateAndSetTokens(res, user);
    
  res.status(200).json({ message: 'Email verified successfully', data });

};

export const sendResetOtpHandler = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send('User not found');

  await user.sendResetPasswordOtp();
  res.status(200).send('Password reset OTP sent to email');
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { otp, newPassword } = req.body;
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send('User not found');

  const isReset = await user.resetPasswordWithOtp(otp, newPassword);
  if (!isReset) return res.status(400).send('Invalid or expired OTP');

  const data = generateAndSetTokens(res, user);

  res.status(200).json({ message: 'Password reset successfully', data });
};
