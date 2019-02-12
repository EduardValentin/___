import { Router } from 'express';
import { register, login, index, deleteUser } from '../controllers/User';
import verifyToken from '../middlewares/verify_token';

const router = Router();

router.get('/',verifyToken, index);
router.post('/register',register);
router.post('/login',login);
router.delete('/delete', verifyToken, deleteUser);

export default router;

