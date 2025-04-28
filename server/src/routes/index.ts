import { Router } from 'express';
import lighthouse from './lighthouse.js';
import auth from './auth.js';

const router = Router();

router.use('/lighthouse', lighthouse);
router.use('/auth', auth);

export default router;
