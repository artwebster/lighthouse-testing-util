import crypto from 'crypto';
import axios from 'axios';
import { Request, Response } from 'express';
import { TestParamsReqBody } from '../types/common';
import { normalizeUrl } from '../utils/normalizeUrl.js';

export default async function prepTestController(req: Request<object, object, TestParamsReqBody>, res: Response) {
	const uuid = crypto.randomUUID();
	const eventSourceAddress = `/lighthouse/runTest/${uuid}`;
	const authHeader = req.headers.authorization;
	const testParams = req.body;

	// ensuring url exists and is a string
	if (typeof testParams.url !== 'string') {
		res.status(400).json({ success: false, message: 'URL is required and must be a string' });
		return;
	}

	// cleaning the url to remove unnecessary characters
	let normalizedUrl: string;
	try {
		normalizedUrl = normalizeUrl(testParams.url.trim());
	} catch (err) {
		res.status(400).json({ success: false, message: 'Invalid URL format' });
		return;
	}

	const cleanTestParams = {
		...testParams,
		url: normalizedUrl
	};

	try {
		axios.post(`http://localhost:5000${eventSourceAddress}`, cleanTestParams, {
			headers: {
				...(authHeader && { Authorization: authHeader })
			}
		});
		res.status(200).json({ status: 200, data: eventSourceAddress, message: 'Test prepped' });
	} catch (error: any) {
		res.status(500).json({ status: 500, message: error.message });
	}
}
