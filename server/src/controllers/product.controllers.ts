import { Request, Response } from 'express';
import Product, { IProduct } from '../models/product.model';
import redisClient from '../config/redis';

export const addProduct = async (req: Request, res: Response) => {
  const { name, description, price, category, images, features, stock } = req.body;
  try {
    const newProduct: IProduct = new Product({ name, description, price, category, images, features, stock });
    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  const { category, minPrice, maxPrice, sort, limit, page, keyword } = req.query;

  const cacheKey = `products:${JSON.stringify(req.query)}`;

  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }


  try {
    const query: any = {};
    
    if (keyword) {
      query.$text = { $search: keyword as string };
    }
    
    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const pageNum = parseInt(page as string) || 1;
    const itemsPerPage = parseInt(limit as string) || 10;
    const skipItems = (pageNum - 1) * itemsPerPage;

    let sortOptions: any = {};
    if (sort === 'price-asc') {
      sortOptions.price = 1;
    } else if (sort === 'price-desc') {
      sortOptions.price = -1;
    } else if (sort === 'newest') {
      sortOptions.createdAt = -1;
    }

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skipItems)
      .limit(itemsPerPage)
      .populate('category'); 

    const totalItems = await Product.countDocuments(query);

    await redisClient.setex(cacheKey, 3600, JSON.stringify({
      products,
      pagination: {
        totalItems,
        currentPage: pageNum,
        itemsPerPage,
        totalPages: Math.ceil(totalItems / itemsPerPage),
      },
    }));

    res.status(200).json({
      products,
      pagination: {
        totalItems,
        currentPage: pageNum,
        itemsPerPage,
        totalPages: Math.ceil(totalItems / itemsPerPage),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve product', error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, category, images, features, stock } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price, category, images, features, stock }, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};


export const getSearchSuggestions = async (req: Request, res: Response) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: 'Keyword is required for suggestions' });
  }

  try {
    const suggestions = await Product.find(
      { name: { $regex: new RegExp(`^${keyword}`, 'i') } },
      { name: 1 }
    )
      .limit(5)
      .exec();

    res.status(200).json(suggestions.map((product) => product.name));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching search suggestions', error });
  }
};
