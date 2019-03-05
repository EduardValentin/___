import { Router } from 'express';
import GenericController from '../controllers/generic_controller';
import verifyToken from '../middlewares/verify_token';

const Controller = new GenericController();

const router = Router();
router.post('/create', verifyToken, Controller.createRecord);
router.put('/edit/:record_id', verifyToken, Controller.editRecord);
router.delete('/delete/:record_id', verifyToken, Controller.deleteRecord);
router.get('/', verifyToken, Controller.fetchAll);
router.get('/:record_id', verifyToken, Controller.fetchOne);

export default router;