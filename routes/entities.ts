import { Router } from 'express';
import EntitiesController from '../controllers/entities_controller';
import verifyToken from '../middlewares/verify_token';

const Controller = new EntitiesController();

const router = Router();
router.post('/new', verifyToken, Controller.createEntity);
router.delete('/drop/:id', verifyToken, Controller.dropEntity);
router.put('/edit/:id', verifyToken, Controller.editEntity);
router.get('/', verifyToken, Controller.fetchAll);
router.get('/:id', verifyToken, Controller.fetchOne);

export default router;