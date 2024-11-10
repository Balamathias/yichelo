import { Router } from 'express';
import { addProduct, getProducts, getProductById, deleteProduct, updateProduct, getSearchSuggestions } from '../controllers/product.controller';
import { verifyAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getProducts as any);
router.get('/:id', getProductById as any);
router.post('/', verifyAdmin, addProduct as any);
router.put('/:id', verifyAdmin, updateProduct as any);
router.delete('/:id', verifyAdmin, deleteProduct as any);
router.get('/search/suggestions', getSearchSuggestions as any);

export default router;
