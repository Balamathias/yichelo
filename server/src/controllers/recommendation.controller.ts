import Product from '../models/product.model';
import User from '../models/user.model';
import { Request, Response } from 'express';

export const getRecommendedProducts = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

  if (isNaN(limit) || limit <= 0) {
    return res.status(400).json({ message: 'Limit must be a positive integer.' });
  }

  try {
    const user = await User.findById(userId).populate('viewedProducts');

    if (!user || !user.viewedProducts || user.viewedProducts.length === 0) {
      const popularProducts = await Product.find()
        .sort({ createdAt: -1 })
        .limit(limit);

      return res.json(popularProducts);
    }

    const viewedCategories = user.viewedProducts.map((product: any) => product.category);

    const recommendations = await Product.find({
      category: { $in: viewedCategories },
      _id: { $nin: user.viewedProducts.map((product: any) => product._id) },
    })
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Error fetching recommendations', error });
  }
};
