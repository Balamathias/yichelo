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

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const user = new User({ username, email, password, phone });
    await user.save();

    const data = generateAndSetTokens(res, user);

    res.status(201).json({ message: 'Account created successfully', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
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