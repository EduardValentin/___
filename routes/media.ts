import { Router } from 'express';
import MediaController from '../controllers/media_controller';
import * as multer from 'multer';
import { megaToBytes } from '../utils/utils';

const Controller = new MediaController();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../../uploads/media`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage, limits: { fileSize: megaToBytes(500) }, });
const router = Router();

router.get('/files', Controller.allFiles);
router.get('/groups', Controller.allGroups);
router.get('/groups/:id', Controller.showGroup);
router.get('/groupped_files', Controller.allFromGroup);
router.post('/files', upload.single('file'), Controller.addFile);
router.post('/groups', Controller.addGroup);
router.delete('/groups/:id', Controller.removeGroup);
router.delete('/files/:id', Controller.removeFile);


export default router;