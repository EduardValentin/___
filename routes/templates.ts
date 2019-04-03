import { Router } from 'express';
import TemplatesController from '../controllers/templates_controller';
import * as multer from 'multer';
import { megaToBytes } from '../utils/utils';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage, limits: { fileSize: megaToBytes(500) }, });
const Controller = new TemplatesController();

const router = Router();
router.get('/', Controller.index);
router.post('/create', upload.single('file'), Controller.createTemplate);
router.delete('/delete/:id', Controller.delete);

export default router;