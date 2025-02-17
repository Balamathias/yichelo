import { Request, Response } from 'express';
import Product, { IProduct } from '../models/product.model';
import redisClient from '../config/redis.config';
import Category from '../models/category.model';
import { trackProductView } from './user.controller';

export const addProduct = async (req: Request, res: Response) => {
  const { name, description, price, category: categoryName, images, features, stock, badge, tags } = req.body;
  try {
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(400).json({ message: `Category ${categoryName} not found` });
    }

    const newProduct: IProduct = new Product({ name, description, price, category: category?._id, images, features, stock, badge, tags });
    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  const { category, minPrice, maxPrice, sort, limit, page, keyword, tag, cacheable } = req.query;

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
      const cat = await Category.findOne({ name: { $regex: new RegExp(category as string, 'i') } });
      if (cat)
        query.category = cat?._id;
    }

    if (tag) {
      query.tags = { $in: [tag] };
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
      sortOptions.updatedAt = -1;
    }

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skipItems)
      .limit(itemsPerPage)
      .populate('category'); 

    const totalItems = await Product.countDocuments(query);

    if (cacheable)
      await redisClient.setex(cacheKey, 100, JSON.stringify({
        products,
        pagination: {
          totalItems,
          currentPage: pageNum,
          itemsPerPage,
          totalPages: Math.ceil(totalItems / itemsPerPage),
          nextPage: pageNum < Math.ceil(totalItems / itemsPerPage) ? pageNum + 1 : null,
          prevPage: pageNum > 1 ? pageNum - 1 : null,
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

    if (req?.user?._id) {
      await trackProductView(req?.user?._id as string, id);
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve product', error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, category: categoryName, images, features, stock, ...rest } = req.body;

  try {
    const category = await Category.findOne({ name: categoryName });
    if (!category) return res.status(400).json({ message: `Category ${categoryName} not found` });

    const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price, category: category?._id, images, features, stock, ...rest }, { new: true });
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
      { name: { $regex: new RegExp(keyword.toString(), 'i') } },
      { name: 1 }
    )
      .limit(5)
      .exec();

    if (suggestions.length === 0) {
      const fallbackSuggestions = await Product.find(
        {},
        { name: 1 }
      )
        .limit(5)
        .exec();

      return res.status(200).json(fallbackSuggestions.map((product) => product.name));
    }

    res.status(200).json(suggestions.map((product) => product.name));
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching search suggestions', error });
  }
};


export const getSimilarProducts = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: productId },
    })
      .limit(4)
      .exec();

    if (similarProducts.length === 0) {
      similarProducts = await Product.find({
        tags: { $in: product.tags },
        _id: { $ne: productId },
      })
        .limit(4)
        .exec();

      if (similarProducts.length === 0) {
        const priceRange = {
          $gte: product.price * 0.8,
          $lte: product.price * 1.2,
        };

        similarProducts = await Product.find({
          price: priceRange,
          _id: { $ne: productId },
        })
          .limit(10)
          .exec();
      }
    }

    res.status(200).json(similarProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching similar products', error });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category }).populate('category');
    res.status(200).json(products);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching products', error });
  }
}