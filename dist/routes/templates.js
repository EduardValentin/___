"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const templates_controller_1 = require("../controllers/templates_controller");
const multer = require("multer");
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});
const upload = multer({ storage });
const Controller = new templates_controller_1.default();
const router = express_1.Router();
router.get('/', Controller.index);
router.post('/create', upload.single('template'), Controller.createTemplate);
router.delete('/delete/:id', Controller.delete);
exports.default = router;
//# sourceMappingURL=templates.js.map