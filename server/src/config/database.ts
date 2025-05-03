import { DataSource } from 'typeorm';
import { join } from 'path';
import { TestResult } from '../models/TestResult.js';
import { NODE_ENV } from './env.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export const AppDataSource = new DataSource({
	type: 'sqlite',
	database: join(__dirname, '..', 'data', 'lighthouse-tests.sqlite'),
	entities: [TestResult],
	synchronize: NODE_ENV === 'development',
	logging: NODE_ENV === 'development'
});

export const initializeDatabase = async (): Promise<void> => {
	try {
		await AppDataSource.initialize();
		console.log('Database has been initialized');

		// ensure tables are created
		await AppDataSource.synchronize();
		console.log('Database schema synchronized');
	} catch (error) {
		console.error('Error during database initialization:', error);
	}
};
