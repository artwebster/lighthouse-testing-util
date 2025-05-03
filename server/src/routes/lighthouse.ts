import { Router } from 'express';
import runTestController from '../controllers/runTestController.js';
import prepTestController from '../controllers/prepTestController.js';
import { authenticateJWT, optionalAuthenticateJWT } from '../middleware/authMiddleware.js';
import { getUserTests } from '../controllers/testHistoryController.js';

const router = Router();

router.post('/prepTest', optionalAuthenticateJWT, prepTestController);
router.route('/runTest/:uuid').post(optionalAuthenticateJWT, runTestController).get(runTestController);

router.get('/history/:testId?', authenticateJWT, getUserTests);

export default router;
