import { Router } from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory, getProductsGroupedByCategory } from '../controllers/category.controller';
import { verifyUser } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const router = Router();

router.get('/', getCategories);
router.post('/', verifyUser, requireRole('admin'), createCategory);
router.put('/:id', verifyUser, requireRole('admin'), updateCategory as any);
router.get('/grouped', getProductsGroupedByCategory)
router.delete('/:id', verifyUser, requireRole('admin'), deleteCategory as any);

export default router;
