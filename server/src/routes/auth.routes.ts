import { Router } from 'express';
import { register, login, logout, refreshTokens, me } from '../controllers/auth.controller';
import { verifyUser as isAuthenticated } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register as any);
router.post('/login', login as any);
router.post('/logout', isAuthenticated, logout as any);
router.post('/refresh', refreshTokens as any);
router.get('/me', isAuthenticated, me as any);

export default router;
