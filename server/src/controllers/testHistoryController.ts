import { Request, Response } from 'express';
import { getTestResultById, getUserTestResults } from '../repositories/testResultRepository.js';
import { GoogleUser } from '../types/common';

export async function getUserTests(req: Request, res: Response): Promise<void> {
	try {
		const user = req.user as GoogleUser;

		if (!user) {
			res.status(401).json({
				success: false,
				message: 'Authentication required'
			});
			return;
		}

		const { testId } = req.params;

		// if a testId was included, fetching just that single test result
		if (testId) {
			const testResult = await getTestResultById(user.id, parseInt(testId, 10));
			if (!testResult) {
				res.status(404).json({
					success: false,
					message: 'Test result not found'
				});
				return;
			}

			res.json({
				success: true,
				result: {
					id: testResult.id,
					url: testResult.url,
					createdAt: testResult.createdAt,
					results: JSON.parse(testResult.results)
				}
			});
			return;
		}

        // otherwise getting all test results for a user
		const testResults = await getUserTestResults(user.id);

		// map results to a more client-friendly format
		const formattedResults = testResults.map((result) => ({
			id: result.id,
			url: result.url,
			createdAt: result.createdAt,
			results: JSON.parse(result.results)
		}));

		res.json({
			success: true,
			results: formattedResults
		});
	} catch (error) {
		console.error('Error fetching test results:', error);
		res.status(500).json({
			success: false,
			message: 'Failed to fetch test results',
			error: error instanceof Error ? error.message : String(error)
		});
	}
}
