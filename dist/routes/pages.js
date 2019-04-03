"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pages_controller_1 = require("../controllers/pages_controller");
const Controller = new pages_controller_1.default();
const router = express_1.Router();
router.get('/', Controller.index);
router.post('/create', Controller.create);
router.put('/change_entity/:id', Controller.changeEntity);
router.put('/:id', Controller.edit);
router.delete('/remove_entity/:id/:entity_id', Controller.removeEntity);
router.delete('/delete/:id', Controller.delete);
exports.default = router;
//# sourceMappingURL=pages.js.map