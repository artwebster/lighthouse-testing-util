import { AppDataSource } from '../config/database.js';
import { TestResult } from '../models/TestResult.js';

export const TestResultRepository = AppDataSource.getRepository(TestResult);

export const saveTestResult = async (
	userId: string,
	url: string,
	results: any,
	createdAt: Date
): Promise<TestResult> => {
	const testResult = new TestResult();
	testResult.userId = userId;
	testResult.url = url;
	testResult.results = JSON.stringify(results);
	testResult.createdAt = createdAt;

	return await TestResultRepository.save(testResult);
};

export const getUserTestResults = async (userId: string): Promise<TestResult[]> => {
	return await TestResultRepository.find({
		where: { userId },
		order: { createdAt: 'DESC' }
	});
};

export const getTestResultById = async (userId: string, id: number): Promise<TestResult | null> => {
	return await TestResultRepository.findOne({
		where: { userId, id }
	});
};
