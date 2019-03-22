import { Router } from 'express';
import TemplatesController from '../controllers/templates_controller';
import * as multer from 'multer';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });
const Controller = new TemplatesController();

const router = Router();
router.get('/', Controller.index);
router.post('/create', upload.single('template'), Controller.createTemplate);
router.delete('/delete/:id', Controller.delete);

export default router;