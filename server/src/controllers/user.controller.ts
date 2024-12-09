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

  const { keyword, page, limit, sort } = req.query;
  
  try {
    const query: any = {};
    
    if (keyword) {
      query.$text = { $search: keyword as string };
    }

    const pageNum = parseInt(page as string) || 1;
    const itemsPerPage = parseInt(limit as string) || 10;
    const skipItems = (pageNum - 1) * itemsPerPage;

    let sortOptions: any = {};

    if (sort) {
      const sortParams = (sort as string).split('-');
      sortOptions[sortParams[0]] = sortParams[1] === 'desc' ? -1 : 1;
    }

    const users = await User.find(query)
      .sort(sortOptions)
      .skip(skipItems)
      .limit(itemsPerPage); 

    const totalItems = await User.countDocuments(query);

    res.status(200).json(
      {
        users,
        pagination: {
          totalItems,
          currentPage: pageNum,
          itemsPerPage,
          totalPages: Math.ceil(totalItems / itemsPerPage),
          nextPage: pageNum < Math.ceil(totalItems / itemsPerPage) ? pageNum + 1 : null,
          prevPage: pageNum > 1 ? pageNum - 1 : null,
        },
      }
    );
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

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.set(req.body);

    await user?.save();

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // await user?.deleteOne();

    // await user?.save();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
