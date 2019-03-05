import { Router } from 'express';
import { register, login, index, deleteUser, getCurrentUser } from '../controllers/user_controller';
import verifyToken from '../middlewares/verify_token';

const router = Router();

router.get('/', verifyToken, index);
router.post('/register', register);
router.post('/login', login);
router.delete('/delete', verifyToken, deleteUser);
router.get('/current', verifyToken, getCurrentUser);

export default router;

