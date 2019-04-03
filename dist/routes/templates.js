"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const templates_controller_1 = require("../controllers/templates_controller");
const multer = require("multer");
const utils_1 = require("../utils/utils");
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});
const upload = multer({ storage, limits: { fileSize: utils_1.megaToBytes(500) }, });
const Controller = new templates_controller_1.default();
const router = express_1.Router();
router.get('/', Controller.index);
router.post('/create', upload.single('file'), Controller.createTemplate);
router.delete('/delete/:id', Controller.delete);
exports.default = router;
//# sourceMappingURL=templates.js.map