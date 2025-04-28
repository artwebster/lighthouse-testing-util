import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config/env.js';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];

		jwt.verify(token, JWT_SECRET, (err, user) => {
			if (err) {
				return res.status(403).json({
					success: false,
					message: 'Invalid or expired token'
				});
			}

			req.user = user;
			next();
		});
	} else {
		res.status(401).json({
			success: false,
			message: 'Authentication token required'
		});
	}
};
