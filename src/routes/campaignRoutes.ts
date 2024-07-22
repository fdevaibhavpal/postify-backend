import { Router } from 'express';
import { createCampaign, getCampaignById } from '../controllers/campaignController';

const router = Router();

router.post('/create', createCampaign);
router.get('/:id', getCampaignById); 

export default router;
