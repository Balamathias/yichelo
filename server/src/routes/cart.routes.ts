import { Router } from 'express';
import { addOrUpdateCartItem, getCart, removeCartItem, syncCart } from '../controllers/cart.controller';
import { verifyUser as isAuthenticated } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', isAuthenticated, getCart as any);
router.post('/', isAuthenticated, addOrUpdateCartItem as any);
router.delete('/:productId', isAuthenticated, removeCartItem as any);
router.post('/sync', isAuthenticated, syncCart as any);

export default router;
