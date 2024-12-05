import { resetPasswordHandler } from './../controllers/auth.controller';
import { Router } from 'express';
import { register, login, logout, refreshTokens, me, sendVerificationOtpHandler, verifyEmailHandler, sendResetOtpHandler } from '../controllers/auth.controller';
import { verifyUser as isAuthenticated } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register as any);
router.post('/login', login as any);
router.post('/logout', isAuthenticated, logout as any);
router.post('/refresh', refreshTokens as any);
router.get('/me', isAuthenticated, me as any);

router.post('/send-verification-otp', isAuthenticated, sendVerificationOtpHandler as any);
router.post('/verify-email', isAuthenticated, verifyEmailHandler as any);

router.post('/send-reset-otp', sendResetOtpHandler as any);
router.post('/reset-password', resetPasswordHandler as any);

export default router;
