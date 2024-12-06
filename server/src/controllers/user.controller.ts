import { Request, Response } from "express";

import User from "../models/user.model";
import mongoose from 'mongoose';

export const trackProductView = async (userId: string, productId: string) => {
  try {
    const productObjectId = new mongoose.Types.ObjectId(productId);

    const user = await User.findById(userId);

    if (user) {
      if (!user.viewedProducts.some((id) => id.equals(productObjectId))) {
        user.viewedProducts.push(productObjectId);

        await user.save();
        console.log('Product view tracked successfully.');
      } else {
        console.log('Product already viewed.');
      }
    } else {
      console.log('User not found.');
    }
  } catch (error) {
    console.error('Error tracking product view:', error);
  }
};


export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = new User(req.body);

    await user.save();

    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

