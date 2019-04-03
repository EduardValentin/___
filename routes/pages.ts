import { Router } from 'express';
import verifyToken from '../middlewares/verify_token';
import PagesController from '../controllers/pages_controller';

const Controller = new PagesController();

const router = Router();
router.get('/', Controller.index);
router.post('/create', Controller.create);
router.put('/change_entity/:id', Controller.changeEntity);
router.put('/:id', Controller.edit);
router.delete('/remove_entity/:id/:entity_id', Controller.removeEntity);
router.delete('/delete/:id', Controller.delete);


export default router;