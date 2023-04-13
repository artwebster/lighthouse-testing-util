import { Router } from 'express';
import runLighthouse from './runLighthouse.js';

const router = Router();

router.use('/api', runLighthouse);

export default router;