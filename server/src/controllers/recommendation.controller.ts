import Product from '../models/product.model';
import User from '../models/user.model';
import { Request, Response } from 'express';

export const getRecommendedProducts = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  try {
    const user = await User.findById(userId).populate('viewedProducts');

    if (!user || user.viewedProducts.length === 0) {
      const popularProducts = await Product.find().limit(10);
      return res.json(popularProducts);
    }

    const viewedCategories = user.viewedProducts.map((product: any) => product.category);
    const recommendations = await Product.find({ category: { $in: viewedCategories } })
      .limit(10)
      .exec();

    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations', error });
  }
};
