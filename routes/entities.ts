import { Router } from 'express';
import EntitiesController from '../controllers/entities_controller';
import verifyToken from '../middlewares/verify_token';
import sanitize from '../middlewares/sanitize_data_entities';

const Controller = new EntitiesController();

const router = Router();
router.post('/new', verifyToken, sanitize, Controller.createEntity);
router.delete('/drop/:id', verifyToken, sanitize, Controller.dropEntity);
router.put('/edit/:id', verifyToken, sanitize, Controller.editEntity);
router.get('/', verifyToken, Controller.fetchAll);
router.get('/:id', verifyToken, Controller.fetchOne);

export default router;