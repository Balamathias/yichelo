import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { JWT_SECRET } from '../config';

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ message: 'Access token missing or invalid' });

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded?.userId);

    if (!user || !user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Forbidden: Requires Admin Access' });
    }

    req.user = user

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ message: 'Access token missing or invalid' });

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded?.userId);

    if (!user) return res.status(403).json({ message: 'Forbidden: Requires User Access' });

    req.user = user;
    
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};
