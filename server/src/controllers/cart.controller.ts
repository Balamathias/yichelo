import { Request, Response } from 'express';
import Cart from '../models/cart.model';
import Product, { IProduct } from '../models/product.model';

export const addOrUpdateCartItem = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [], totalPrice: 0 });
    }

    const existingProductIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (existingProductIndex > -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    cart.totalPrice = cart.products.reduce((total, item) => {
      const productPrice = item.productId.toString() === productId ? product.price : 0;
      return total + productPrice * item.quantity;
    }, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart', error });
  }
};

export const getCart = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('products.productId');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve cart', error });
  }
};

export const removeCartItem = async (req: Request, res: Response) => {
  const userId = req.user;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('products.productId');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.products = cart.products.filter(item => item.productId.toString() !== productId);
    cart.totalPrice = cart.products.reduce((total, item) => {
      return total + item.quantity * (item.productId as unknown as IProduct).price;
    }, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item from cart', error });
  }
};

export const syncCart = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { products } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [], totalPrice: 0 });
    }

    products.forEach(({ productId, quantity }: { productId: string, quantity: number }) => {
      const existingProductIndex = cart.products.findIndex(p => p.productId.toString() === productId);

      if (existingProductIndex > -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({ productId: productId as any, quantity });
      }
    });

    const productDetails = await Product.find({ _id: { $in: cart.products.map(p => p.productId) } });
    cart.totalPrice = cart.products.reduce((total, item) => {
      const product = productDetails.find(p => (p as unknown as IProduct)?._id?.toString() === item.productId.toString());
      return product ? total + product.price * item.quantity : total;
    }, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to sync cart', error });
  }
};
