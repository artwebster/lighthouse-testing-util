import { Router } from 'express';
import runTestController from '../controllers/runTestController.js';
import prepTestController from '../controllers/prepTestController.js';

const router = Router();

router.post('/prepTest', prepTestController);
router.route('/runTest/:uuid').post(runTestController).get(runTestController);

export default router;
