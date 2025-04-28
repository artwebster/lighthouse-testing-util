import { Request, Response } from 'express';
import { CLIENT_URL } from '../config/env.js';

import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import { GoogleUser } from '../types/common.js';

export const handleGoogleCallback = (req: Request, res: Response) => {
	if (!req.user) {
		res.redirect(`${CLIENT_URL}/login-failed`);
		return;
	}

	const user = req.user as GoogleUser;

	// creating JWT payload
	const payload = {
		id: user.id,
		email: user.email,
		name: user.displayName
	};

	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

	res.redirect(`${CLIENT_URL}?token=${token}`);
};

export const verifyToken = (req: Request, res: Response) => {
	// if we get here, the token is valid and req.user is set by middleware
	res.status(200).json({
		success: true,
		message: 'Token valid',
		user: req.user
	});
};
