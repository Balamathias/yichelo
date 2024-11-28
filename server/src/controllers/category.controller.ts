import { Request, Response } from 'express';
import Category from '../models/category.model';
import Product from '../models/product.model';

export const createCategory = async (req: Request, res: Response) => {
  const { name, description, thumbnail } = req.body;
  try {
    const newCategory = new Category({ name, description, thumbnail });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories', error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, thumbnail } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, { name, description, thumbnail }, { new: true });
    if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error updating category', error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving category', error });
  }
};

export const getProductsGroupedByCategory = async (req: Request, res: Response) => {
  try {
    const groupedProducts = await Product.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryInfo',
        },
      },
      { $unwind: '$categoryInfo' },
      {
        $group: {
          _id: '$categoryInfo._id',
          categoryName: { $first: '$categoryInfo.name' },
          products: { $push: '$$ROOT' },
          count: { $sum: 1 },
          avgRating: { $avg: '$rating' },
          totalStock: { $sum: '$stock' },
          thumbnail: { $first: '$categoryInfo.thumbnail'},
          description: { $first: '$categoryInfo.description' }
        },
      },
      {
        $project: {
          categoryName: 1,
          products: 1,
          count: 1,
          avgRating: 1,
          totalStock: 1,
          thumbnail: 1,
          description: 1,
        },
      },
    ]);

    res.status(200).json(groupedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error grouping products by category', error });
  }
};