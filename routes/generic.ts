import { Router } from 'express';
import GenericController from '../controllers/generic_controller';
import verifyToken from '../middlewares/verify_token';
import sanitizeGenericEntities from '../middlewares/sanitize_generic_entities';

const Controller = new GenericController();

const router = Router();
router.post('/create/:entity_id', verifyToken, sanitizeGenericEntities, Controller.createRecord);
router.put('/edit/:entity_id/:record_id', verifyToken, sanitizeGenericEntities, Controller.editRecord);
router.delete('/delete/:entity_id/:record_id', verifyToken, Controller.deleteRecord);
router.get('/:entity_id', verifyToken, Controller.fetchAll);
router.get('/:entity_id/:record_id', verifyToken, Controller.fetchOne);

export default router;