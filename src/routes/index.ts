import { Router } from 'express';
import authRoutes from './authRoutes';
import campaignRoutes from './campaignRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/campaign', campaignRoutes);

export default router;
