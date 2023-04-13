import { Router } from 'express';
import lighthouseController from '../controllers/lighthouseController.js';

const router = Router();

router.post('/lighthouse', lighthouseController);

export default router;