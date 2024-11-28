import { Router } from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory, getProductsGroupedByCategory, getCategory } from '../controllers/category.controller';
import { verifyUser } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const router = Router();

router.get('/', getCategories);
router.get('/grouped', getProductsGroupedByCategory)
router.get('/:id', getCategory as any);
router.post('/', verifyUser, requireRole('admin'), createCategory);
router.put('/:id', verifyUser, requireRole('admin'), updateCategory as any);
router.delete('/:id', verifyUser, requireRole('admin'), deleteCategory as any);

export default router;
