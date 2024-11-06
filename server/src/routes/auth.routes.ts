import { Router } from 'express';
import { register, login, logout, refreshTokens } from '../controllers/auth.controllers';
import { verifyUser as isAuthenticated } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register as any);
router.post('/login', login as any);
router.post('/logout', isAuthenticated, logout as any);
router.post('/refresh', refreshTokens as any);

export default router;
