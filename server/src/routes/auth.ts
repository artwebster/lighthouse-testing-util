import { Router } from 'express';
import passport from 'passport';
import { CLIENT_URL } from '../config/env.js';
import { handleGoogleCallback, verifyToken } from '../controllers/authController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: `${CLIENT_URL}/login-failed` }),
	handleGoogleCallback
);

router.get('/verify-token', authenticateJWT, verifyToken);

export default router;
