import { Router } from 'express';
import SettingsController from '../controllers/settings_controller';

const Controller = new SettingsController();

const router = Router();

router.get('/setting/:setting_name', Controller.getSetting);

export default router;