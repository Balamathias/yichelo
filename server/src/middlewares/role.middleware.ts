import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

export const requireRole = (role: 'customer' | 'seller' | 'admin'): any => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.user?._id)
      if (!user) return res.status(404).json({ message: 'User not found' });

      if (!user.roles.includes(role)) {
        return res.status(403).json({ message: 'Forbidden: Access denied' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Error verifying role', error });
    }
  };
};
