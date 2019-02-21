import { Router } from 'express';
import { getTemplate } from '../controllers/settings_controller';

const router = Router();
router.get('/template', getTemplate);

export default router;